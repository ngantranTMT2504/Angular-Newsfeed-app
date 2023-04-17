import { Injectable, InjectionToken } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

export const EncryptDecryptServiceInstance = new InjectionToken<EncryptDecryptService>('encrypt passwork')
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
