import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  formAddNews?: FormGroup;
  avatarUrl?: string;
  userName!:string;
  constructor(
    private fb : FormBuilder,
    private store : AngularFirestore,
    private auth : AuthService
  ) {
    this.auth.userName.subscribe((name) => {
      this.userName = name;
    });
    this.getAvatarUrl();
  }
  ngOnInit() {
    this.formAddNews = this.fb.group({
      userName: this.fb.control(sessionStorage.getItem('user')),
      status: this.fb.control('', Validators.required)
    });
  }
  
  getAvatarUrl(){
    this.store.collection('users').doc(this.userName).get().subscribe((res) => {
      const url = res.get('avatar.avatar');
      this.avatarUrl = url;
    })
  }
}
