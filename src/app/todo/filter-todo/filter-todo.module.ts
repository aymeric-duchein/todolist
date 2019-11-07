import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTodoComponent } from './filter-todo.component';
import { MatButtonToggleModule } from '@angular/material';


@NgModule({
  declarations: [FilterTodoComponent],
  exports: [
    FilterTodoComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule
  ]
})
export class FilterTodoModule {
}
