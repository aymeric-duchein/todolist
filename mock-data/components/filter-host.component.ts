import { Component } from '@angular/core';
import { TodoInterface } from '../../src/app/todo/todo.interface';

@Component({
  selector: 'app-mock-filter-host',
  template: `
    <app-filter-todo [filter]="filter" (filterChanged)="filterChanged($event)"></app-filter-todo>
  `,
})
export class MockFilterTodoHostComponent {
  filter: TodoInterface.Filter;
  filterChanged(filter: string): void {}
}
