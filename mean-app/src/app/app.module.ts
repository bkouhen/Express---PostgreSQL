import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {RouterModule} from "@angular/router";
import {PostsService} from "./posts.service";
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import {SignupService} from "./services/signup.service";

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'test',
    component: TestComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    TestComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService, SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
