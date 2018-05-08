import { Injectable } from '@angular/core';
 
import { Observable, ReplaySubject} from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable()
export class AuthService {
  redirectUrl: string = '/';
  constructor() { }
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  login(name: string) {
    console.log(name);
    localStorage.setItem('user', name);
    this.isAuthenticatedSubject.next(true);
  }
  logout() {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    return false;
  }

  isLogin() {
    if (localStorage.getItem('user')) {
      this.login(localStorage.getItem('user'));
    }
  }

  checkLogin() {
    if (localStorage.getItem('user')) {
      this.login(localStorage.getItem('user'));
    }
  }


}
