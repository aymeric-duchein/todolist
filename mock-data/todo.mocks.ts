import { TodoInterface } from '../src/app/todo/todo.interface';

export namespace MockTodo {

  export const completedTodo: TodoInterface.Todo = {
    id: '1',
    name: 'Tâche 1',
    completed: true
  };

  export const todoInProgress: TodoInterface.Todo = {
    id: '2',
    name: 'Tâche 2',
    completed: false
  };

  export const todoInProgressUpdated: TodoInterface.Todo = {
    id: '2',
    name: 'Tâche 2 modifiée',
    completed: true
  };

}
