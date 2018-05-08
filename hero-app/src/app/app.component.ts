import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Heroes App';
  isSignIn = false;

  constructor(
    private authService: AuthService
  ) {}

  
  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.authService.checkLogin();    
  }

  signOut() {
    this.isSignIn = this.authService.logout();
  }
}
