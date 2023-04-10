import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = new Subject<string>();
  
  getUserName(name : string){
    this.userName.next(name);
  }
}
