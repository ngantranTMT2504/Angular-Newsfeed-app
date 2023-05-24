import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/service/firestore.service';
import { NotificationInstance, NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  imageUrl: any;
  selectImg: any;
  formStatus!: FormGroup;
  counter: number = 0;
  disable: boolean = true;

  constructor(
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    @Inject (NotificationInstance) private notify : NotificationService
  ) {
   }
  ngOnInit(): void {
    this.formStatus = new FormGroup({
      image: new FormControl(''),
      status : new FormControl('')
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
    this.counter = this.notify._getNotification() + 1;
    this.firestoreService.postNews(status, this.selectImg);
    this.notify._setNotification(this.counter);
    this.disable = false;
    this.dialog.closeAll();
  }
}