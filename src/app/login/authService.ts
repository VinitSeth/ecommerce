import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authSecretKey = 'Bearer Token';
  private readonly apiUrl = 'https://dummyjson.com/user/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    const body = {
      username: username,
      password: password,
      expiresInMins: 30 // Optional, defaults to 60
    };

    return this.http.post<{ token: string }>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => {
        // Store token in localStorage if authentication is successful
        localStorage.setItem(this.authSecretKey, response.token);
        return true;
      }),
      catchError(() => {
        // Handle error and return false for failed authentication
        return of(false);
      })
    );
  }

  isAuthenticatedUser(): boolean {
    // Check if token exists in localStorage
    return !!localStorage.getItem(this.authSecretKey);
  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
  }
}
