import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  public toDo = '';
  public filterType = 'all';
  public toDoList = [{
      name: 'Angular',
      isCompleted: false,
    },
    {
      name: 'JS',
      isCompleted: false,
    },
    {
      name: 'React',
      isCompleted: true,
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  removeToDo(index) {
    this.toDoList.splice(index, 1);
  }

  addToDo() {
    this.toDoList.push({
      name: this.toDo,
      isCompleted: false
    });
    this.toDo = '';
  }

  onToDoClicked(item) {
    console.log('click');
    item.isCompleted = !item.isCompleted;
  }

  filterToDo(type) {
    this.filterType = type;
  }

  filterToDoOfType(type) {
    console.log(type);
    switch (type) {
      case 'completed':
        return this.toDoList.filter(toDo => toDo.isCompleted);
        break;
      case 'to-do':
        return this.toDoList.filter(toDo => !toDo.isCompleted);
        break;
      default:
        return this.toDoList;
        break;
    }
  }
}
