import { Injectable } from '@angular/core';
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PostsService {

  constructor(private http:Http, public authHttp: AuthHttp) { }

  // Get all posts from the API
  getAllPosts() {
    return this.authHttp.get('/api/todos')
      .map(res => res.json());
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
