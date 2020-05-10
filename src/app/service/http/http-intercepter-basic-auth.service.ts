import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(
    // private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const username = 'usr';
    const password = '123';
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    // let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    // let username = this.basicAuthenticationService.getAuthenticatedUser()

    // if (basicAuthHeaderString && username) {
    request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    // }
    return next.handle(request);
  }
}
