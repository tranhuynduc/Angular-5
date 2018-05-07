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
  constructor(
    private authService: AuthService,
    private router: Router,
    private userSerivce: UserService
  ) { }

  ngOnInit() {
  }


  signIn() {
    let count = 0
    
    this.userSerivce.checkUser(this.name).subscribe(data => {
      count = data.count;
      console.log('count2');
    });

    console.log('count');
  }
}
