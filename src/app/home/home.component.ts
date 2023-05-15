import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from './share/comment/comment.component';
import { CreateNewsComponent } from './share/create-news/create-news.component';
import { Firestore, collection, collectionData} from '@angular/fire/firestore'
import { FirestoreService } from '../service/firestore.service';
import { ViewNewsPictureComponent } from '../view-news-picture/view-news-picture.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formAddNews?: FormGroup;
  formComment?: FormGroup;
  avatarUrl: any;
  posts? : any;
  
  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog,
    private firestore : Firestore,
    private service : FirestoreService,
    private toastr : ToastrService,
    public loader : LoaderService
  ) {
    this.getAvatar(this.service.userName);
    this.getPost();
  }
  ngOnInit() {
    this.formAddNews = new FormGroup({
      status: new FormControl('', Validators.required)
    });
  }
  getAvatar(userName:string) {
    this.store.collection('users').doc(userName).get().subscribe((res) => {
      this.avatarUrl = res.get('avatar.avatar');
    })
  }
  createNews() {
    this.dialog.open(CreateNewsComponent);
  }
  getPost() {
    const instancePost = collection( this.firestore, 'post');
    collectionData(instancePost,{idField: 'id'}).subscribe((res) => {
      this.loader.setLoading(false)
      this.posts = res.sort((a,b) => {return b['time'] - a['time']});
      console.log(res);
    })
  }
  openComment(id: string){
    const dialogRef = this.dialog.open(CommentComponent, {
      data: id
    })
    dialogRef.afterClosed().subscribe(result =>{
      result = id
    })
  }
  viewPicture(image: string){
    const dialogRef = this.dialog.open(ViewNewsPictureComponent, {
      data : image
    })
    dialogRef.afterClosed().subscribe(result =>{
      result = image
    })
  }
  shareNews(){
    this.toastr.success('You just share this News!')
  }
  likedNews(){
    this.toastr.success('You just like this News!')
  }
}


