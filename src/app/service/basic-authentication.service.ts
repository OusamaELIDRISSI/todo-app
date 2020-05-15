import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationBean } from '../model/authenticationBean.model';
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
      `${API_URL}/authenticate`, {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

  executeAuthenticationService(username, password) {
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    const myObservable = this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, { headers });
    return myObservable.pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }));
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticaterUser');
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
    sessionStorage.removeItem('token');
  }

}
