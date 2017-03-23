import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message:String;
  user:User;
  user_status:boolean;

  constructor(private authService:AuthService, private router:Router) { this.user = new User;}

  ngOnInit() {
  }

  loginUser(user){
    this.authService.loginUser(user).subscribe( res => {
      this.user_status = res['success'];
      if(res['success'] == true) {
        this.authService.setUser(res['user']);
        this.router.navigate(['/posts']);
      } else {
        this.message = res['message'];
      }
    });
  }

}
