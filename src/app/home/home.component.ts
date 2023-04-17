import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewsComponent } from './share/create-news/create-news.component';
import { getFirestore, doc, getDoc, getDocs, collection} from 'firebase/firestore';
import { user } from './user.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  formAddNews?: FormGroup;
  avatarUrl?: any;
  userName = sessionStorage.getItem('userName') || '';
  posts?:object[];
  constructor(
    private fb : FormBuilder,
    private store : AngularFirestore,
    private dialog : MatDialog,
    ) {
      this.getAvatar();
      this.getPost();
  }
  ngOnInit() {
    this.formAddNews = new FormGroup({
      status: new FormControl('', Validators.required)
    });
    
  }
  getAvatar(){
    this.store.collection('users').doc(this.userName).get().subscribe((res) => {
      this.avatarUrl = res.get('avatar.avatar');
   })
  }
  createNews(){
    this.dialog.open(CreateNewsComponent)
  }
  getPost(){
    this.store.collection('post').get().subscribe(res => {
      res.forEach((doc) => {
        this.store.collection('post').doc(doc.id).get().subscribe(res => {
        })
       })
       console.log(this.posts)
    })
  }
}
    

