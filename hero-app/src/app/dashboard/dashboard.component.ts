import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
 
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getHeroes(): void {

  }

  signOut() {
  }
}
