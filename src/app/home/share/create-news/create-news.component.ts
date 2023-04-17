import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';

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
  constructor(
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) {}

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
    var filePath = `post:${this.userName}/${this.selectImg}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.store.collection('users').doc(this.userName).get().subscribe((avt) => {
      this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((res) => {
            this.store.collection('post').add({
              post : {
                creatorId: this.userName,
                avatar: avt.get('avatar.avatar'),
                content: status.value,
                image: res,
                timestamp: new Date().getTime()
              }
            });
          })
        })
      ).subscribe();
      this.dialog.closeAll()
   })
  }

}

