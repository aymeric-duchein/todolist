import { NgxsModule, Store } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import { TodoPartialState, TodoState } from './todo.state';
import { MockTodoState } from '@mock-data/todo-state.mocks';
import { TodoActions } from './todo.actions';
import { MockTodo } from '@mock-data/todo.mocks';
import { TodoInterface } from '../todo.interface';
import { MockTodoService } from '@mock-data/todo-service.mocks';
import { of, throwError } from 'rxjs';

describe('TodoState', () => {

  let store: Store;
  const todoStateSelector = (state: TodoPartialState) => state.todo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([TodoState]),
      ],
      providers: [
        MockTodoService.provide
      ]
    });

    store = TestBed.get(Store);
  });

  test(`doit lever une erreur lors du chargement des tâches`,  () => {

    MockTodoService.mock.getAll.mockImplementationOnce(() => throwError('erreur'));

    store.dispatch(new TodoActions.GetAll());

    expect(store.selectSnapshot(todoStateSelector)).toEqual({
      ...MockTodoState.initial,
      error: 'Le chargement des tâches a échoué'
    });

  });

  test(`doit ajouter la liste des tâches à partir du service`,  () => {

    MockTodoService.mock.getAll.mockImplementationOnce(() => of([
      MockTodo.completedTodo,
      MockTodo.todoInProgress
    ]));

    store.dispatch(new TodoActions.GetAll());

    expect(store.selectSnapshot(todoStateSelector)).toEqual(MockTodoState.withTodoList);

  });

  test(`doit ajouter la liste des tâches`,  () => {

    store.dispatch(new TodoActions.GetAllSuccess([
      MockTodo.completedTodo,
      MockTodo.todoInProgress
    ]));

    expect(store.selectSnapshot(todoStateSelector)).toEqual(MockTodoState.withTodoList);

  });

  test(`doit ajouter une tâche`,  () => {

    store.reset({
      todo: {
        ...MockTodoState.withTodoList,
        todoList: [
          MockTodo.completedTodo
        ]
      }
    });

    MockTodoService.mock.add.mockImplementationOnce(() => of(MockTodo.todoInProgress));

    store.dispatch(new TodoActions.Add(
      MockTodo.todoInProgress.name
    ));

    expect(store.selectSnapshot(todoStateSelector)).toEqual(MockTodoState.withTodoList);

  });

  test(`doit lever une erreur lors de l'ajout d'une tâche`,  () => {

    store.reset({
      todo: {
        ...MockTodoState.withTodoList,
        todoList: [
          MockTodo.completedTodo
        ]
      }
    } as TodoPartialState);

    MockTodoService.mock.add.mockImplementationOnce(() => throwError('erreur'));

    store.dispatch(new TodoActions.Add(
      MockTodo.todoInProgress.name
    ));

    expect(store.selectSnapshot(todoStateSelector)).toEqual({
      ...MockTodoState.withTodoList,
      todoList: [
        MockTodo.completedTodo
      ],
      error: `L'ajout de la tâche a échoué`
    });

  });

  test(`doit mettre à jour une tâche`,  () => {

    store.reset({
      todo: MockTodoState.withTodoList,
    } as TodoPartialState);

    MockTodoService.mock.update.mockImplementationOnce(() => of({
      ...MockTodo.todoInProgress,
      name: 'Nouveau nom',
      completed: true
    }));

    store.dispatch(new TodoActions.ChangeStatus(
      MockTodo.todoInProgress.id
    ));

    expect(store.selectSnapshot(todoStateSelector)).toEqual({
      ...MockTodoState.withTodoList,
      todoList: [
        MockTodo.completedTodo,
        {
          id: MockTodo.todoInProgress.id,
          name: 'Nouveau nom',
          completed: true
        }
      ]
    });

  });

  test(`doit lever une erreur lors de la mise à jour d'une tâche`,  () => {

    store.reset({
      todo: MockTodoState.withTodoList,
    } as TodoPartialState);

    MockTodoService.mock.update.mockImplementationOnce(() => throwError('erreur'));

    store.dispatch(new TodoActions.ChangeStatus(
      MockTodo.todoInProgress.id
    ));

    expect(store.selectSnapshot(todoStateSelector)).toEqual({
      ...MockTodoState.withTodoList,
      error: `Le changement d'état de la la tâche a échoué`
    });

  });

  test(`doit changer le filtre`,  () => {

    store.reset({
      todo: MockTodoState.withTodoList,

    } as TodoPartialState);

    store.dispatch(new TodoActions.Filter(
      TodoInterface.Filter.COMPLETED
    ));

    expect(store.selectSnapshot(todoStateSelector)).toEqual({
      ...MockTodoState.withTodoList,
      filter: TodoInterface.Filter.COMPLETED
    });

  });

  test.each([[true], [false]])(`doit retourner %s pour l'état du chargement`, (loaded: boolean) => {

    expect(TodoState.loaded({
      ...MockTodoState.initial,
      loaded
    })).toBe(loaded);
  });

  test.each([
    [TodoInterface.Filter.COMPLETED],
    [TodoInterface.Filter.IN_PROGRESS],
    [TodoInterface.Filter.ALL],
    ])(`doit retourner %s pour le filtre`, (filter: TodoInterface.Filter) => {

    expect(TodoState.filter({
      ...MockTodoState.initial,
      filter
    })).toBe(filter);
  });

  test(`doit retourner toutes les tâches`, () => {

    expect(TodoState.todoList(MockTodoState.withTodoList)).toEqual([
      MockTodo.completedTodo,
      MockTodo.todoInProgress
    ]);
  });

  test(`doit retourner les tâches en cours`, () => {

    expect(TodoState.todoList({
      ...MockTodoState.withTodoList,
      filter: TodoInterface.Filter.IN_PROGRESS
    })).toEqual([
      MockTodo.todoInProgress
    ]);
  });

  test(`doit retourner les tâches terminées`, () => {

    expect(TodoState.todoList({
      ...MockTodoState.withTodoList,
      filter: TodoInterface.Filter.COMPLETED
    })).toEqual([
      MockTodo.completedTodo
    ]);
  });

});
