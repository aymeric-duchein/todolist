import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TodoActions } from './todo.actions';
import { TodoInterface } from '../todo.interface';
import { catchError, mergeMap } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { TodoService } from './todo.service';

export interface TodoStateModel {
  loaded: boolean;
  todoList: TodoInterface.Todo[];
  filter: TodoInterface.Filter;
  error?: string;
}

const TODO_STATE_KEY = 'todo';

export interface TodoPartialState {
  [TODO_STATE_KEY]: TodoStateModel;
}

const byName = (a: TodoInterface.Todo, b: TodoInterface.Todo) => a.name.localeCompare(b.name);

const matchingStateFilter = (state: TodoStateModel) => (todo: TodoInterface.Todo) => TodoInterface.Filter.COMPLETED === state.filter
    ? todo.completed
    : !todo.completed;


@State<TodoStateModel>({
  name: TODO_STATE_KEY,
  defaults: {
    loaded: false,
    todoList: [],
    filter: TodoInterface.Filter.ALL
  }
})
export class TodoState {

  @Selector()
  static todoList(state: TodoStateModel) {
    if (TodoInterface.Filter.ALL === state.filter) {
      return [...state.todoList].sort(byName);
    }
    return state.todoList.filter(matchingStateFilter(state)).sort(byName);
  }

  @Selector()
  static filter(state: TodoStateModel) {
    return state.filter;
  }

  @Selector()
  static loaded(state: TodoStateModel) {
    return state.loaded;
  }

  constructor(@Inject(TodoService) private readonly todoService: TodoService) {
  }

  @Action(TodoActions.GetAll)
  getAll({dispatch}: StateContext<TodoStateModel>) {

    return this.todoService.getAll().pipe(
      mergeMap(todoList => dispatch(new TodoActions.GetAllSuccess(todoList))),
      catchError(error => dispatch(new TodoActions.ThrowException(`Le chargement des tâches a échoué`, error)))
    );

  }

  @Action(TodoActions.GetAllSuccess)
  getAllSuccess({getState, setState}: StateContext<TodoStateModel>, {todoList}: TodoActions.GetAllSuccess) {
    setState({
      ...getState(),
      loaded: true,
      todoList
    });
  }

  @Action(TodoActions.Add)
  add({dispatch}: StateContext<TodoStateModel>, {name}: TodoActions.Add) {

    return this.todoService.add(name).pipe(
      mergeMap(newTodo => dispatch(new TodoActions.AddSuccess(newTodo))),
      catchError(error => dispatch(new TodoActions.ThrowException(`L'ajout de la tâche a échoué`, error)))
    );

  }


  @Action(TodoActions.AddSuccess)
  addSuccess({patchState, getState}: StateContext<TodoStateModel>, {todo}: TodoActions.AddSuccess) {
    patchState({
      todoList: [
        ...getState().todoList,
        todo
      ]
    });
  }

  @Action(TodoActions.ChangeStatus)
  changeStatus({dispatch, getState}: StateContext<TodoStateModel>, {id}: TodoActions.ChangeStatus) {

    const todoTobeUpdated = getState().todoList.find(todoInList => todoInList.id === id);

    return this.todoService.update({...todoTobeUpdated, completed: !todoTobeUpdated.completed}).pipe(
      mergeMap(updatedTodo => dispatch(new TodoActions.ChangeStatusSuccess(updatedTodo))),
      catchError(error => dispatch(new TodoActions.ThrowException(`Le changement d'état de la la tâche a échoué`, error)))
    );

  }

  @Action(TodoActions.ChangeStatusSuccess)
  changeStatusSuccess({getState, setState}: StateContext<TodoStateModel>, {todo}: TodoActions.ChangeStatusSuccess) {

    setState({
      ...getState(),
      todoList: [
        ...getState().todoList.filter(todoInList => todo.id !== todoInList.id),
        todo
      ]
    });
  }

  @Action(TodoActions.Filter)
  filter({getState, setState}: StateContext<TodoStateModel>, {filter}: TodoActions.Filter) {
    setState({
      ...getState(),
      filter
    });
  }

  @Action(TodoActions.ThrowException)
  throwException({getState, setState}: StateContext<TodoStateModel>, {description}: TodoActions.ThrowException) {

    setState({
      ...getState(),
      error: description
    });
  }
}
