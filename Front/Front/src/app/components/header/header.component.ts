import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {User} from "../../entity/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

}
