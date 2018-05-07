import { Injectable } from '@angular/core';
 
import { Observable} from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable()
export class AuthService {
  redirectUrl: string = '/';
  constructor() { }

  login() {
    if (localStorage.getItem('hero')) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('hero');
    return false;
  }

  isLogin() {
    return localStorage.getItem('hero');
  }
}
