import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {Oauth2Service} from "../../services/oauth2.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private oauth2Service: Oauth2Service,
    private toastr: ToastrService
    ) {
  }

  ngOnInit() {
  }

  public signInWithGoogle(): void {
    this.oauth2Service.singUpWithGoogle()
      .then((idToken) => {
        this.loginService.signInWithGoolge(idToken)
          .subscribe(
            resp => {
              if (isNullOrUndefined(resp)) return;
              this.router.navigate(['']);
            },
            error => {
              console.error(error);
            });
      })
      .catch((err) => {
        this.toastr.error("Vous n'êtes pas connecté avec Google", "Erreur d'authentification");
        window.location.replace('/login');
      });
  }
}
