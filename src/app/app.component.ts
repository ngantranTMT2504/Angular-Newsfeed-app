import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NotificationInstance, NotificationService } from './service/notification.service';
import { UserInstance, UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck, OnInit{
  title = 'NewsFeed';
  menu = false;
  counter?: number = 0;
  displayNotifies: boolean = false;
  
  constructor(
    private route: Router,
    private store: AngularFirestore,
    @Inject(UserInstance) private user: UserService,
    @Inject(NotificationInstance) private notify : NotificationService
  ) {};

  ngOnInit(): void {
    this.getInfoUser();
    this.notify._getNotificationAsObserverble().subscribe(res => {
      this.counter = res;
      console.log('counter: '+this.counter)
    })
  };

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
  };

  getInfoUser(){
    this.store.collection('users').doc(sessionStorage.getItem('userName')).get().subscribe(res => {
      this.user._setUser({
        'userName': sessionStorage.getItem('userName'),
        'avatar': res?.get('avatar.avatar'),
      })
    })
  };

  unsetNotification(){
    this.displayNotifies = true;
    this.notify._setNotification(0);
  };

  closeNotifies(){
    this.displayNotifies = false;
  };
}
