import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/internal/operators";
import {BehaviorSubject, Observable, of, throwError} from "rxjs/index";

import {AUTH_GOOGLE_URI, MUSICHUB_API} from "../../consts";
import {User} from "../entity/User";

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private googleAuthUrl = MUSICHUB_API + AUTH_GOOGLE_URI;
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signInWithGoolge(token: string): Observable<HttpResponse<any>> {
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

  static signOut(): void {
    localStorage.removeItem('currentUser');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private handleLoginError(err: HttpErrorResponse) {
    if(err.error instanceof ErrorEvent) {
      console.error('Client Error side : ', err.error.message);
    }
    else {
      if(err.error.error.name === 'UnauthorizedError' &&
        err.error.error.message === 'jwt expired') {
          LoginService.signOut();
          LoginService.log('Votre session a expirée ! Veuillez vous reconnectez');
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
