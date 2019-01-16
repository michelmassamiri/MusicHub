import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/internal/operators";
import {BehaviorSubject, Observable, of, throwError} from "rxjs/index";

import {AUTH_GOOGLE_URI, MUSICHUB_API} from "../../consts";
import {User} from "../entity/User";
import {Router} from "@angular/router";
import {Oauth2Service} from "./oauth2.service";

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public googleAuthUrl = MUSICHUB_API + AUTH_GOOGLE_URI;
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private oauth2Service: Oauth2Service
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public signInWithGoolge(token: string): Observable<HttpResponse<any>> {
    headers = headers.append('Authorization-google', token);

    return this.http.post<any>(this.googleAuthUrl, null, {headers, observe: 'response'})
      .pipe(
        tap((resp) => {
          const genToken = resp.headers.get('generatedToken');
          let user: User = resp.body;
          user.token = genToken;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleLoginError)
        // catchError(this.handleError<any>('sign in'))
      );
  }

  public signOut(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.oauth2Service.signOutFromGoogle()
      .then(()=> console.log('signed Out from Google'))
      .catch(()=> console.log('err'));
    window.location.replace('/login');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /* Error handler */
  private handleLoginError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
      console.error('Client Error side : ', err.error.message);
    }
    else {
      if(err.error.error.name === 'UnauthorizedError' &&
        err.error.error.message === 'jwt expired') {
          this.signOut();
          LoginService.log('Votre session a expirée ! Veuillez vous reconnectez');
          this.router.navigate(['login']);
      }
      console.error(err.error);
      return throwError(err.message);
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoginService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private static log(message: string) {
    alert(message);
  }
}
