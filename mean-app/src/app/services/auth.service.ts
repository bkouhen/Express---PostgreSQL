import { Injectable } from '@angular/core';
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import {Subject, Observable} from "rxjs";

@Injectable()
export class AuthService {

  token : string;
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  constructor(private http:Http) { }

  setUser(user : User) {
    this.userSource.next(user);
  }

  registerUser(user : User) : Observable<boolean> {
    console.log('registerUser', user);
    var headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/users/register', JSON.stringify(user), {headers:headers})
      .map(res => this.setToken(res));
  }

  loginUser(user : User) : Observable<Object> {
    var headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/users/login', JSON.stringify(user), {headers:headers})
      .map(res => this.setToken(res));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  verify() : Observable<Object> {

    let currUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.get('api/users/check-state', { headers: headers }).map( res => this.parseRes(res) );

  }

  setToken(res){
    console.log('setToken', res);
    let body = JSON.parse(res['_body']);
    if( body['success'] == true ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({
        user_mail: body['user']['user_mail'],
        token: this.token
      }));
    }
    return body;
  }

  parseRes(res){
    let body = JSON.parse(res['_body']);
    return body;
  }

}
