import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {
  private isLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.authService.isAuthenticated.subscribe(
      isLogin => this.isLogin = isLogin
    )
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
