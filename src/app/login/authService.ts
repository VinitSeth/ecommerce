import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authSecretKey = 'Bearer Token';
  private readonly apiUrl = 'https://dummyjson.com/user/login';
  private readonly userKey = 'loggedInUser';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const body = {
      username: username,
      password: password,
      expiresInMins: 30, // Optional, defaults to 60
    };

    return this.http
      .post<{ token: string; [key: string]: any }>(this.apiUrl, body, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        map((response) => {
          // Store token in localStorage if authentication is successful
          localStorage.setItem(this.authSecretKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response));
          return true;
        }),
        catchError(() => of(false))
      );
  }

  isAuthenticatedUser(): boolean {
    return !!localStorage.getItem(this.authSecretKey);
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem(this.userKey);
  }

  getUserDetails(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }
}
