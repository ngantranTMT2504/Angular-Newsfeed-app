import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from './share/comment/comment.component';
import { CreateNewsComponent } from './share/create-news/create-news.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import { ViewNewsPictureComponent } from '../view-news-picture/view-news-picture.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../service/loader.service';
import { UserInstance, UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formAddNews?: FormGroup;
  formComment?: FormGroup;
  posts?: any| [];
  userInfo?: any;
  
  constructor(
    private dialog: MatDialog,
    private firestore: Firestore,
    private toastr: ToastrService,
    public loader: LoaderService,
    @Inject(UserInstance) private user: UserService
  ) {
    this.loader.setLoading(true);
    this.getPost();
  }
  ngOnInit() {
    this.formAddNews = new FormGroup({
      status: new FormControl('', Validators.required)
    });
    this.user._getUserAsObservable().subscribe(res => {
      this.userInfo = res;
      console.log(res);
    });
  }

  createNews() {
    this.dialog.open(CreateNewsComponent);
  }
  getPost() {
    const instancePost = collection(this.firestore, 'post');
    collectionData(instancePost, { idField: 'id' }).subscribe((res) => {
      this.posts = res.sort((a, b) => { return b['time'] - a['time'] });
      console.log(res);
      this.loader.setLoading(false);
    })
  }
  openComment(id: string) {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: id
    })
    dialogRef.afterClosed().subscribe(result => {
      result = id
    })
  }
  viewPicture(image: string) {
    const dialogRef = this.dialog.open(ViewNewsPictureComponent, {
      data: image
    })
    dialogRef.afterClosed().subscribe(result => {
      result = image
    })
  }
  shareNews() {
    this.toastr.success('You just share this News!')
  }
  likedNews() {
    this.toastr.success('You just like this News!')
  }
}


