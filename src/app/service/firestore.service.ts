import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { posts } from '../posts.models';
import { Firestore,arrayUnion} from '@angular/fire/firestore'
import { finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userName = sessionStorage.getItem('userName') || '';
  constructor(
    private store: AngularFirestore,
    private firestore : Firestore,
    private storage: AngularFireStorage,
  ) { }

  setPost(post?: posts["post"]) {
    this.store.collection('post').add(post);
  }
  getDocId(){
    this.store.collection('post').snapshotChanges().pipe(map( post => post.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id,data}
    }))
    );
  }
  setComment(id: string, commentValue: string) {
    this.store.collection('users').doc(this.userName).get().subscribe((res) => {
      res.get('avatar.avatar')
      let comment = {
        "comment": commentValue,
        "creatorName": this.userName,
        "avatarCmt": res.get('avatar.avatar')
      }
      this.store.collection('post').doc(id).update({
        comment: arrayUnion(comment)
      })
    })
  }
  postNews(status: HTMLTextAreaElement, selectImg: any) {
    let post: {
      "content": string,
      "image": string,
      "creatorName": string,
      "creatorAvatar": string,
      "time": number,
      "comment": []
    }
    var filePath = `post:${this.userName}/${selectImg}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.store.collection('users').doc(this.userName).get().subscribe((avt) => {
      this.storage.upload(filePath, selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((res) => {
            post = {
              "content": status.value,
              "image": '',
              "creatorName": this.userName,
              "creatorAvatar": avt.get('avatar.avatar'),
              "time": new Date().getTime(),
              "comment": []
            }
            if(selectImg !== undefined){
              post.image = res;
            }
            this.setPost(post)
          })
        })
      ).subscribe(res => {console.log(res)})
    })
  }
  
}
