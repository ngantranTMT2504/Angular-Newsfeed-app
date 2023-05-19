import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserInstance, UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit{
  title = 'NewsFeed';
  menu = false;
  
  constructor(
    private route: Router,
    private store: AngularFirestore,
    @Inject(UserInstance) private user: UserService,
  ) {};

  ngOnInit(): void {
    this.getInfoUser();
  }
  ngDoCheck(): void {
    let currentUrl = this.route.url;
    if(currentUrl== '/home'){
      this.menu = true;
    }else{
      this.menu = false;
    }
  };
  backLoginPage(){
    sessionStorage.clear()
    this.route.navigate(['login'])
  }
  getInfoUser(){
    this.store.collection('users').doc(sessionStorage.getItem('userName')).get().subscribe(res => {
      this.user._setUser({
        'userName': sessionStorage.getItem('userName'),
        'avatar': res?.get('avatar.avatar'),
        
      })
    })
  }
}
