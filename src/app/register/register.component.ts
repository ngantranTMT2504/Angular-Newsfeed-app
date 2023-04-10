import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: Router,
    private store: AngularFirestore,
    private crypt: EncryptDecryptService
  ) { };
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: this.fb.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      fullname: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
    })
  };
  register() {
    this.registerForm.value.password = this.crypt.encrypt(this.registerForm.value.password)
    if(this.registerForm.valid){
        this.toastr.success('Registeration successfully');
        this.route.navigate(['/login']);
        this.store.collection('users').doc(this.registerForm.value.userName).set({
          info: this.registerForm.value
        });
      } else{
      this.toastr.error('You must inter information valid', 'Your information wrong');
    }
  };
}
