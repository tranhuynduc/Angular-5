import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  name: string = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  signIn() {

  }
}
