import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any = [];
  items:any = [];
  title : string;
  titleItem:any = [];

  constructor(private postsService : PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;

      for (let post of posts) {
        console.log(post);
        console.log(post.todoItems);
        this.items[post.id] = post.todoItems;
        this.items[post.id].reverse();
        this.titleItem[post.id] = '';
      }

      console.log(this.titleItem);
      console.log(this.items);

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

  addItem(event, postID) {
    event.preventDefault();
    var newItem = {
      content : this.titleItem[postID]
    }

    console.log(newItem);

    this.postsService.addItem(newItem, postID).subscribe(item => {

      this.items[postID].push(item);
      this.titleItem[postID] = '';
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

    deleteItem(postID, itemID) {

      var items = this.items;

      this.postsService.deleteItem(postID, itemID).subscribe(() => {
        for (var i = 0; i < items[postID].length; i++) {
          if (items[postID][i].id == itemID) {
            items[postID].splice(i, 1);
          }
        }
      });
  }

  updateBoolItem(item) {
    var item_2 = {
      id : item.id,
      content : item.content,
      complete : !item.complete,
      todoId : item.todoId

    };

    this.postsService.updateBoolItem(item_2).subscribe(updatedTodoItem => {
      item.complete = !item.complete;
    });
  }

}
