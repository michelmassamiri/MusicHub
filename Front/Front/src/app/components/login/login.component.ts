import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {LoginService} from "../../services/login.service";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
//declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private socialAuthService: AuthService,
    private loginService: LoginService,
    private router: Router,
    ) {
    // gapi.load('client:auth2', () => {
    //   gapi.auth2.init({
    //     client_id: '490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com',
    //     cookiepolicy: 'single_host_origin',
    //     scope: 'profile email https://www.googleapis.com/auth/youtube.readonly'
    //   });
    // });
  }

  ngOnInit() {
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((user) => {
        this.loginService.signInWithGoolge(user.idToken)
          .subscribe(
            resp => {
              if (isNullOrUndefined(resp)) return;
              this.router.navigate(['']);
            },
            error => {
              console.error(error);
            });
      })
      .catch(() => console.error('Impossible de se connecter avec google'));
  }

  signIn(): void{
    //gapi.auth2.getAuthInstance().signIn().then(user => console.log(user));
  }
}
