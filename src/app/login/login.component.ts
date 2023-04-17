import { Component, OnInit , Inject} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncryptDecryptService, EncryptDecryptServiceInstance } from '../service/encrypt-decrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private store: AngularFirestore,
    @Inject(EncryptDecryptServiceInstance) private crypt : EncryptDecryptService
  ) {};
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      password: new FormControl('', Validators.required)
    })
  };
  login() {
    this.store.collection('users').doc(this.loginForm.value.userName).get().subscribe(res => {
      const password = res.get('info.password')
      if (this.crypt.decrypt(password) === this.loginForm.value.password) {
        sessionStorage.setItem('userName', this.loginForm.value.userName)
        this.route.navigate(['home'])
      } else {
        this.toastr.error("Your account invalid");
        this.route.navigate(['/login'])
      }
    });
  }
}
