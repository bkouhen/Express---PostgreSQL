import { Injectable } from '@angular/core';
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {

  constructor(private http:Http) { }

  addUser(newUser) {
    var headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/users/register', JSON.stringify(newUser), {headers:headers})
      .map(res => res.json());
  }

}
