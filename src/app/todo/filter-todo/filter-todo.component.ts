import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoInterface } from '../todo.interface';

@Component({
  selector: 'app-filter-todo',
  template: `
    <mat-button-toggle-group #filters name="fontStyle" aria-label="Font Style" [value]="filter">
      <mat-button-toggle value="ALL" (click)="filterChangedClicked('ALL')">Tous</mat-button-toggle>
      <mat-button-toggle value="IN_PROGRESS" (click)="filterChangedClicked('IN_PROGRESS')">En cours</mat-button-toggle>
      <mat-button-toggle value="COMPLETED" (click)="filterChangedClicked('COMPLETED')">Terminées</mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: []
})
export class FilterTodoComponent {

  @Input() filter: TodoInterface.Filter;
  @Output() filterChanged: EventEmitter<TodoInterface.Filter> = new EventEmitter<TodoInterface.Filter>();

  filterChangedClicked(filter: string): void {
    this.filterChanged.emit(TodoInterface.Filter[filter]);
  }
}
