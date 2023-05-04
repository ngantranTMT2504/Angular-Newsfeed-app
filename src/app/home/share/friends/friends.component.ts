import { Component } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends = [
    {name : "Johnathan Ngo", avatar : "assets/images/avatar1.webp"},
    {name : "Jessica ", avatar : "assets/images/avatar2.jpg"},
    {name : "Kim Tran", avatar : "assets/images/avatar4.jpg"},
    {name : "Thu Nhi", avatar : "assets/images/avatar1.webp"},
    {name : "Nguyen Ha", avatar : "assets/images/avatar5.jpg"},
    {name : "Ngoc Kim", avatar : "assets/images/avatar3.jpg"}
  ]
}
