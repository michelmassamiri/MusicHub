import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap} from "rxjs/internal/operators";
import {Observable, of} from "rxjs/index";

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/auth/google';

  constructor(private http: HttpClient) { }

  signInWithGoolge(token: string): Observable<any> {
    httpOptions.headers = httpOptions.headers.append('Authorization', token);

    return this.http.post(this.url, null, httpOptions).pipe(
      tap((userData)=> {
        // Save the User Token
        alert(userData);
      }),
      catchError(this.handleError<string>('sign in'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    alert(message);
  }
}
