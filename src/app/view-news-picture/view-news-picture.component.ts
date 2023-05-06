import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-news-picture',
  templateUrl: './view-news-picture.component.html',
  styleUrls: ['./view-news-picture.component.css']
})
export class ViewNewsPictureComponent {
  imgUrl!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) data : any
  ) {
    this.imgUrl = data
  }
}
