import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  spinner: boolean;

  constructor(private spinnerService: SpinnerService) {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: '490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email https://www.googleapis.com/auth/youtube.readonly'
      }).then(()=> {
        console.log('oauth2 is loaded');
      });
    });
  }

  ngOnInit() {
    let self = this;

    this.spinnerService.status.subscribe((value => {
      self.spinner = value;
    }));
  }
}
