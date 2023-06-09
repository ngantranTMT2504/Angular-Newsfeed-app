import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService, EncryptDecryptServiceInstance } from '../service/encrypt-decrypt.service';
import { LoaderService } from '../service/loader.service';

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
    public loader : LoaderService,
    @Inject(EncryptDecryptServiceInstance) private crypt : EncryptDecryptService
  ) {
    this.loader.setLoading(true)
   };
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      fullname: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    })
  };
  register() {
    this.loader.setLoading(false);
    this.registerForm.value.password = this.crypt.encrypt(this.registerForm.value.password)
    if(this.registerForm.valid){
      this.store.collection('users').doc(this.registerForm.value.userName).set({
        info: this.registerForm.value,
        avatar: {
          avatar : "assets/images/avt-icon.png"
        }
      });
      this.toastr.success('Registeration successfully');
      this.route.navigate(['/login']);
      } else{
      this.toastr.error('You must inter information valid', 'Your information wrong');
    }
    this.loader.setLoading(true)
  };
}
