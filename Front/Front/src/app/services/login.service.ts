import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/internal/operators";
import {Observable, of, throwError} from "rxjs/index";

let headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/auth/google';

  constructor(private http: HttpClient) { }

  signInWithGoolge(token: string): Observable<HttpResponse<any>> {
    headers = headers.append('Authorization-google', token);

    return this.http.post<any>(this.url, null, {headers, observe: 'response'})
      .pipe(
        tap((resp) => {
          const genToken = resp.headers.get('generatedToken');
          localStorage.setItem('access_token', genToken);
        }),
        catchError(this.handleLoginError)
        // catchError(this.handleError<any>('sign in'))
      );
  }

  static signOut(): void {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
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
