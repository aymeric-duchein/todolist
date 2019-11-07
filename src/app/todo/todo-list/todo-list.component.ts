import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoInterface } from '../todo.interface';

@Component({
  selector: 'app-todo-list',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let todo of todoList">
        <app-todo-list-item [todo]="todo" (todoClicked)="emitTodoClicked(todo)"></app-todo-list-item>
      </mat-list-item>
    </mat-list>
  `,
  styles: []
})
export class TodoListComponent implements OnInit {
  @Input() todoList: TodoInterface.Todo[];
  @Output() todoClicked: EventEmitter<TodoInterface.Todo>;

  constructor() {
    this.todoClicked = new EventEmitter<TodoInterface.Todo>();
  }

  ngOnInit() {
  }

  emitTodoClicked(todo: TodoInterface.Todo) {
    this.todoClicked.emit(todo);
  }

}
