import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import {RouterModule, CanActivate} from "@angular/router";
import {PostsService} from "./posts.service";
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import {SignupService} from "./services/signup.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

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
    component: PostsComponent,
    // We'll use the canActivate API and pass in our AuthGuard.
    // Now any time the /special route is hit, the AuthGuard will run first to make sure the user is logged in
    // before activating and loading this route.
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    component: TestComponent
  }
];

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
};

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
  providers: [PostsService, SignupService, AuthService, AuthGuard, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
