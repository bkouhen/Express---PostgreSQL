import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any = [];
  title : string;

  constructor(private postsService : PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts; console.log(posts);
    });
  }

  addPost(event) {
    event.preventDefault();
    var newPost = {
      title : this.title
    }

    this.postsService.addPost(newPost)
      .subscribe(post => {
        this.posts.push(post);
        this.title = '';
      });

  }

  deletePost(id){
        var posts = this.posts;

        this.postsService.deletePost(id).subscribe(() => {
                for(var i = 0;i < posts.length;i++){
                    if(posts[i].id == id){
                        posts.splice(i, 1);
                    }
                }
        });
    }

}
