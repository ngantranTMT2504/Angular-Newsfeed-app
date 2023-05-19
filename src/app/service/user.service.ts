import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const UserInstance = new InjectionToken<UserService>('injection token for new feed app');

export class UserService {

  readonly USER!: BehaviorSubject<any>;

  constructor() {
    this.USER = new BehaviorSubject<any>(null);
  }

  _setUser(data: any) {
    this.USER.next(data);
  };

  _getUser(){
    return this.USER.value;
  };
  
  _getUserAsObservable(): Observable<any>{
    return this.USER.asObservable()
  };
}
