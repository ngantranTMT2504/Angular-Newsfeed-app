import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements DoCheck{
  title = 'NewsFeed';
  menu = false;
  constructor(
    private route: Router
  ) {};
  ngDoCheck(): void {
    let currentUrl = this.route.url;
    if(currentUrl== '/home'){
      this.menu = true;
    }else{
      this.menu = false;
    }
  };
  
}
