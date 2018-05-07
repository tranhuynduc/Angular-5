import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  public userList = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    return this.userService.getUsers().subscribe(data => this.userList = data);
  }
}
