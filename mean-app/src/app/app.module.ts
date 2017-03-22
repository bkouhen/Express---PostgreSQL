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
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component : LoginComponent
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
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PostsService, SignupService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
