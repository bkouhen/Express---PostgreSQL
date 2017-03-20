import { Component, OnInit } from '@angular/core';
import {SignupService} from "../services/signup.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user_mail : string;
  user_password: string;

  constructor(private signupService : SignupService) { }

  ngOnInit() {
  }

  addUser(event) {
    event.preventDefault();
    var newUser = {
      user_mail : this.user_mail,
      user_password : this.user_password
    }

    this.signupService.addUser(newUser).subscribe( user => {
      console.log('user created', user);
      this.user_mail = '';
      this.user_password = '';
    })

  }

}
