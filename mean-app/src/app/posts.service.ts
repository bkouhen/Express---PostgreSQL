import { Injectable } from '@angular/core';
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  token:string;

  constructor(private http:Http) { }

  // Get all posts from the API

  getAllPosts() {
    let currUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    return this.http.get('/api/todos', {headers:headers}).map(res => res.json());
    }

  addPost(newPost) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/todos', JSON.stringify(newPost), {headers : headers})
      .map(res => res.json());
  }

  addItem(newItem, postID) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/todos/' + postID + '/items', JSON.stringify(newItem), {headers : headers})
      .map(res => res.json());
  }

  deletePost(id) {
    return this.http.delete('/api/todos/' + id)
      .map(res => res.json());
  }

  deleteItem(postID, itemID) {
    return this.http.delete('/api/todos/' + postID + '/items/' + itemID)
      .map(res => res.json());
  }

  updateBoolItem(item_2) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/todos/' + item_2.todoId + '/items/' + item_2.id, JSON.stringify(item_2), {headers : headers})
      .map(res => res.json());
  }

}
