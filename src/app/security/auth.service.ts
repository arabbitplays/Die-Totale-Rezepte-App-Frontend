import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  SESSION_ATTRIBUTE_NAME = 'token'

  createSessionToken(username: string, password: string) {
    sessionStorage.setItem(
      this.SESSION_ATTRIBUTE_NAME,
      this.createAuthenticationToken(username, password)
    );
  }

  createAuthenticationToken(username: string, password: string) : string {
    return "Basic " + btoa(username + ':' + password);
  }

  logout() {
    sessionStorage.removeItem(this.SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggenInUserToken() {
    let user = sessionStorage.getItem(this.SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
