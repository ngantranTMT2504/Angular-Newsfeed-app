import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  updatedata: any;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private crypt: EncryptDecryptService,
    private store: AngularFirestore,
    private auth: AuthService
  ) { };
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      password: this.fb.control('', Validators.required)
    })
    this.auth.getUserName(this.loginForm.value.userName);
  };

  login() {
    this.store.collection('users').doc(this.loginForm.value.userName).get().subscribe(res => {
      // console.log(res.get('info.password'));
      const password = res.get('info.password')
      if (this.crypt.decrypt(password) === this.loginForm.value.password) {
        this.route.navigate(['set-avatar']);
      } else {
        this.toastr.error("Your account invalid");
        this.route.navigate(['/login'])
      }
    });
  }
}
