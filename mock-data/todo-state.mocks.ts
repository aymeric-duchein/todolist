import { TodoInterface } from '../src/app/todo/todo.interface';
import { TodoStateModel } from '../src/app/todo/+state/todo.state';
import { MockTodo } from './todo.mocks';

export namespace MockTodoState {

  export const initial: TodoStateModel = {
    loaded: false,
    todoList: [],
    filter: TodoInterface.Filter.ALL
  };


  export const withTodoList: TodoStateModel = {
    loaded: true,
    todoList: [
      MockTodo.completedTodo,
      MockTodo.todoInProgress
    ],
    filter: TodoInterface.Filter.ALL
  };

}
