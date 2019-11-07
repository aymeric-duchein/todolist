import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../todo.interface';

@Component({
  selector: 'app-todo-list-item',
  template: `
    <div *ngIf="todo" class="todo" [ngClass]="todo.completed ? 'status-completed' : ''" (click)="todoClicked.emit()">
      {{ todo.name }}
    </div>
  `,
  styles: [`
    .todo:hover {
      cursor: pointer;
      color: grey;
    }

    .status-completed {
      text-decoration: line-through;
    }`]
})
export class TodoListItemComponent {

  @Input() todo: TodoInterface.Todo;
  @Output() todoClicked: EventEmitter<void>;

  constructor() {
    this.todoClicked = new EventEmitter<void>();
  }

}
