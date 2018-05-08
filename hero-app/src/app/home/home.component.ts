import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public title = 'Home Page';
  navItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Sign In',
      link: '/login',
    },
    {
      name: 'Sign Up',
      link: '/register',
    }
  ]
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {

  }
}
