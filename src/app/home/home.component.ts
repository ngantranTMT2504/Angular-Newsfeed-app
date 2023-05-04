import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from './share/comment/comment.component';
import { CreateNewsComponent } from './share/create-news/create-news.component';
import { Firestore, collection, collectionData} from '@angular/fire/firestore'
import { FirestoreService } from '../service/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formAddNews?: FormGroup;
  formComment?: FormGroup;
  avatarUrl: any;
  posts? : any;
  disable = true;
  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog,
    private firestore : Firestore,
    private service : FirestoreService,
  ) {
    this.getAvatar(this.service.userName);
    this.getPost();
    this.submit();
    sessionStorage.removeItem('userName');
  }
  ngOnInit() {
    this.formAddNews = new FormGroup({
      status: new FormControl('', Validators.required)
    });
  }
  submit(){
    setTimeout(
      () => {
        this.disable = false;
      }, 5000
    )
   }
  getAvatar(userName:string) {
    this.store.collection('users').doc(userName).get().subscribe((res) => {
      this.avatarUrl = res.get('avatar.avatar');
    })
  }
  createNews() {
    this.dialog.open(CreateNewsComponent)
  }
  getPost() {
    const instancePost = collection( this.firestore, 'post');
    collectionData(instancePost,{idField: 'id'}).subscribe((res) => {
      this.posts = res;
      console.log(res)
    })
  }
  openComment(id: string){
    const dialogRef =this.dialog.open(CommentComponent, {
      data: id
    })
    dialogRef.afterClosed().subscribe(result =>{
      result = id
    })
  }
}


