import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  message = '';
  name: '';
  password: '';
  

  constructor(
    private userSerivce: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    console.log('register');
    if (this.password === '' || this.name === '') {
      return this.message = 'Username and password can\'t be blank';
    }
    let user =  {
      name: this.name,
      password: this.password,
    }
    this.userSerivce.getUser(this.name).subscribe(data => {
      if (data.length) {
        return this.message = 'User name is existed';
      }
      
      
      this.userSerivce.createUser(user).subscribe(data => {
        console.log('create user', data);
        this.router.navigate(['/login']);
        
      })
      // this.message = 'login success';
      // this.authService.login(data[0].name);
    });
  }

}
