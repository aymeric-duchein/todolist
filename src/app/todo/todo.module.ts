import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListModule } from './todo-list/todo-list.module';
import { AddTodoModule } from './add-todo/add-todo.module';
import { FilterTodoModule } from './filter-todo/filter-todo.module';
import { TodoService } from './+state/todo.service';
import { TodoStateModule } from './+state/todo-state.module';


@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    TodoListModule,
    AddTodoModule,
    FilterTodoModule,
    TodoStateModule
  ],
  providers: [TodoService]
})
export class TodoModule {
}
