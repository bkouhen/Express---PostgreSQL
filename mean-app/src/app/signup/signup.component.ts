import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User;
  message:string = '';

  constructor(private authService:AuthService, private router:Router) { this.user = new User;}

  ngOnInit() {
  }

  registerUser(user) {
    console.log(user);
    this.authService.registerUser(user).subscribe((res) => {
      console.log(res);
      if( res['success'] == true ) {
        this.authService.setUser(res['user']);
        this.router.navigate(['']);
      } else {
        this.message = res['message'];
      }
    });
  }

}
