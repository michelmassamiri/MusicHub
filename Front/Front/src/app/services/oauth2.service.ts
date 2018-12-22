import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {

  constructor() {
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
