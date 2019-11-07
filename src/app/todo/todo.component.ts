import { Component, Inject, OnInit } from '@angular/core';
import { TodoInterface } from './todo.interface';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { TodoState } from './+state/todo.state';
import { TodoActions } from './+state/todo.actions';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Select(TodoState.todoList) todoList$: Observable<TodoInterface.Todo[]>;
  @Select(TodoState.loaded) loaded$: Observable<boolean>;
  @Select(TodoState.filter) filter$: Observable<TodoInterface.Filter>;

  constructor(@Inject(Store) private readonly store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new TodoActions.GetAll());
  }

  addTodo(name: string) {
    this.store.dispatch(new TodoActions.Add(name));
  }

  changeTodoStatus(todo: TodoInterface.Todo) {
    this.store.dispatch(new TodoActions.ChangeStatus(todo.id));
  }


  filter(filter: TodoInterface.Filter) {
    this.store.dispatch(new TodoActions.Filter(filter));
  }
}
