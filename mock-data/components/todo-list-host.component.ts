import { Component } from '@angular/core';
import { TodoInterface } from '../../src/app/todo/todo.interface';

@Component({
  template: `<app-todo-list [todoList]="todoList"
                            (todoClicked)="onTodoClicked($event)"></app-todo-list>`
})
export class TodoListHostComponent {
  todoList: TodoInterface.Todo[] = [
    {
      id: '1',
      name: 'Ecrire les tests',
      completed: false
    },
    {
      id: '2',
      name: 'finir le workshop',
      completed: false
    }];

  onTodoClicked = jest.fn();
}
