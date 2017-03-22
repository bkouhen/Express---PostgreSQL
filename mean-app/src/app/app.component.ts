import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {User} from "./models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'My Post App!';
  user : User;
  message:String;
  subscription:Subscription;

  constructor(private authService:AuthService) {
    this.subscription = authService.user$.subscribe((user) => this.user = user);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    //example of verification
    this.authService.verify().subscribe( (res) => {
      console.log(res);
      this.message = res['message'];
    }
    );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.message = "Logged out";
  }

}
