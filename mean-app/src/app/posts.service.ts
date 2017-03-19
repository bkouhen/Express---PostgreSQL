import { Injectable } from '@angular/core';
import {Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http:Http) { }

  // Get all posts from the API

  getAllPosts() {
    return this.http.get('/api/todos')
      .map(res => res.json());
    }

  addPost(newPost) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/todos', JSON.stringify(newPost), {headers : headers})
      .map(res => res.json());
  }

  deletePost(id) {
    return this.http.delete('/api/todos/' + id)
      .map(res => res.json());
  }

}
