import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {LoginService} from "../../services/login.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
              private loginService: LoginService) {}

  ngOnInit() {
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((user) => {
        this.loginService.signInWithGoolge(user.idToken)
          .subscribe(
            resp => {
              if(isNullOrUndefined(resp)) return;

              console.log(resp.body);
              // redirect UserPlaylistHomePage
            },
            error => {
              console.error(error);
          });
      })
      .catch(()=> console.error('Impossible de se connecter avec google'));
  }
}
