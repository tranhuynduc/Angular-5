import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';
  message: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private userSerivce: UserService,
  ) { }

  ngOnInit() {
  }


  signIn() {
    if (this.password === '' || this.name === '') {
      return this.message = 'Username and password can\'t be blank';
    }
    this.userSerivce.getUser(this.name).subscribe(data => {
      if (!data.length) {
        return this.message = 'User name doesn\'t exist';
      }
      
      if (this.password !== data[0].password) {
        return this.message = 'Password is incorrect';
      }

      this.message = 'login success';
      this.authService.login(data[0].name);
      this.router.navigate(['/']);
    });
  }
}
