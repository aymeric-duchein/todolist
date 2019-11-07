import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListItemModule } from '../todo-list-item/todo-list-item.module';
import { MatListModule } from '@angular/material';


@NgModule({
  declarations: [TodoListComponent],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    TodoListItemModule
  ]
})
export class TodoListModule {
}
