import { Component } from '@angular/core';

@Component({
  selector: 'app-mock-add-todo-host',
  template: `
    <app-add-todo (addTodo)="addTodo($event)"></app-add-todo>
  `,
})
export class MockAddTodoHostComponent {
  addTodo(name: string): void {}
}
