import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/service/firestore.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  imageUrl: any;
  selectImg: any;
  formStatus!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
    public loader : LoaderService
  ) {
    this.loader.setLoading(true)
   }
  ngOnInit(): void {
    this.formStatus = new FormGroup({
      image: new FormControl(''),
      status : new FormControl('')
    })
  }
  upload(event: any) {
    if (event.target.files[0] && event.target.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectImg = event.target.files[0];
    } else {
      this.imageUrl = '';
      this.selectImg = '';
    }
  }
  postNews(status: HTMLTextAreaElement) {
    this.loader.setLoading(false);
    this.firestoreService.postNews(status, this.selectImg);
    this.toastr.success('You posted 1 news!');
    this.dialog.closeAll();
  }
}