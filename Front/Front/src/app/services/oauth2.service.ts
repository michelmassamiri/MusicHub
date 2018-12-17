import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  private auth2: any;

  constructor() {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: '490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email https://www.googleapis.com/auth/youtube.readonly'
      }).then(()=> {
        this.auth2 = gapi.auth2.getAuthInstance();
      });
    });
  }

  singUpWithGoogle() : Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      gapi.auth2.getAuthInstance().signIn()
        .then(user => {
          const idToken = user.getAuthResponse(true).id_token;
          resolve(idToken);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    });
  }

  signOutFromGoogle(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      gapi.auth2.getAuthInstance().signOut()
        .then(()=> resolve(true))
        .catch(()=> resolve(false));
    });
  }
}
