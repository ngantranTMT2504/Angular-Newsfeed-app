import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { FirestoreService } from 'src/app/service/firestore.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  imageUrl: any;
  selectImg: any;
  formStatus!: FormGroup;
  userName = sessionStorage.getItem('userName') || '';
  // posts?: posts["post"]
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private firestoreService: FirestoreService
  ) { }
  ngOnInit(): void {
    this.formStatus = new FormGroup({
      image: new FormControl('')
    })
  }
  upload(event: any) {
    if (event.target.files[0] && event.target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
    } else {
      this.imageUrl = '';
      this.selectImg = '';
    }
  }
  postNews(status: HTMLTextAreaElement) {
    let post: {"content":string,"image": string,"creatorName": string,"creatorAvatar": string,"time": number, "comment": []}
    var filePath = `post:${this.userName}/${this.selectImg}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.store.collection('users').doc(this.userName).get().subscribe((avt) => {
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((res) => {
            post = { 
              "content": status.value,
              "image": res,
              "creatorName": this.userName,
              "creatorAvatar": avt.get('avatar.avatar'),
              "time": new Date().getTime(),
              "comment": []
            }
            this.firestoreService.setPost(post)
          })
        })
    ).subscribe()
  })
  this.dialog.closeAll();
}

setComment(){
  
}
}