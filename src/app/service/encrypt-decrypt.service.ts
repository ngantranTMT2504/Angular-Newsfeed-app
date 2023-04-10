import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  keyPassword = 'password'

  constructor() { }

  encrypt(password:string){
    return CryptoJS.AES.encrypt(password, this.keyPassword).toString();
  }
  decrypt(password:string){
    return CryptoJS.AES.decrypt(password, this.keyPassword).toString(CryptoJS.enc.Utf8);
  }
}
