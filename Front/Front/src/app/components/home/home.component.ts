import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angular-6-social-login';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
              private loginService: LoginService) {}

  ngOnInit() {
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then((user) => {
      console.log(user.idToken);
      this.loginService.signInWithGoolge(user.idToken)
        .subscribe(
          userToken => {
            console.log(userToken);
          },
          error => {
            console.log(error);
          });
    });

  }

}
