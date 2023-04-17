import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService, EncryptDecryptServiceInstance } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private store: AngularFirestore,
    @Inject(EncryptDecryptServiceInstance) private crypt : EncryptDecryptService
  ) { };
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      fullname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
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
