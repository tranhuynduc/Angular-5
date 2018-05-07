import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
}  from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild{

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('chack Auth');
   let url: string = state.url;
   console.log(this.checkLogin(url));
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.login()) {
      return true;
    }
    this.authService.redirectUrl = url;
    // this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
