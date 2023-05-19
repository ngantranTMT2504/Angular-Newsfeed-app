import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/service/firestore.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  formComment!: FormGroup;
  avatarUrl?: any;
  id?: string
  comments: any;
  
  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog,
    private firestoreService: FirestoreService,
    private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.id = data
    this.getAvatar(this.firestoreService.userName);
    this.getComment(this.id);
  }
  ngOnInit(): void {
    this.formComment = new FormGroup({
      comment : new FormControl('')
    })
  }

  getAvatar(userId: string) {
    this.store.collection('users').doc(userId).get().subscribe((res) => {
      this.avatarUrl= res.get('avatar.avatar');
    })
  }
  postComment(){
    if(this.formComment.value.comment != '') {
      this.firestoreService.setComment(this.id, this.formComment.value.comment);
      this.getComment(this.id)
    } else{
      this.toastr.error("Comment can't have null value", "Enter your comment")
    }
  }
  getComment(id:string){
    this.store.collection('post').doc(id).get().subscribe((res) =>{
      this.comments = res.get("comment")
    })
  }
}
