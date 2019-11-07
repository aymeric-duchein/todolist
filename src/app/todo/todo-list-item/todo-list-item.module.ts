import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListItemComponent } from './todo-list-item.component';


@NgModule({
  declarations: [TodoListItemComponent],
  imports: [
    CommonModule
  ],
  exports: [TodoListItemComponent]
})
export class TodoListItemModule {
}
