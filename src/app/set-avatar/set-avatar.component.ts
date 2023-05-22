import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { UserInstance, UserService } from '../service/user.service';

@Component({
  selector: 'app-set-avatar',
  templateUrl: './set-avatar.component.html',
  styleUrls: ['./set-avatar.component.css']
})
export class SetAvatarComponent implements OnInit {
  selectImg: any;
  formAvatar!: FormGroup;
  userName = sessionStorage.getItem('userName') || '';
  imgsrc: string = 'assets/images/avt-icon.png';

  constructor(
    private storage: AngularFireStorage,
    private route: Router,
    private store: AngularFirestore,
    private toastr: ToastrService,
    @Inject(UserInstance) private user: UserService,
  ) { }
  ngOnInit() {
    this.formAvatar = new FormGroup({
      avatar: new FormControl(null)
    });
  }
  upload(event: any) {
    if (event.target.files[0] && event.target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgsrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
    } else {
      this.imgsrc = 'assets/images/avt-icon.png';
      this.selectImg = 'assets/images/avt-icon.png';
    }
  }
  uploadImg() {
    var filePath = `avatar:${this.userName}/${this.selectImg}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAvatar.value.avatar = url;
          this.store.collection('users').doc(this.userName).update({
            avatar: this.formAvatar.value
          });
          this.user._setUser({
            'userName': this.userName,
            'avatar': this.formAvatar.value.avatar,
          })
        })
      })
    ).subscribe();
    this.toastr.success('Your avatar was changed', 'Changed avatar successfully')
    this.formAvatar.reset();
    this.route.navigate(['home']);
  }
}

