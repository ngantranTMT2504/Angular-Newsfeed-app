import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { posts } from '../posts.models';
import { Firestore,arrayUnion} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userName = sessionStorage.getItem('userName') || '';
  
  constructor(private store: AngularFirestore, private firestore : Firestore) { }
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
}
