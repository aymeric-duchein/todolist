import { TodoService } from './todo.service';
import { TestBed } from '@angular/core/testing';
import { MockHttpClient } from '@mock-data/http-client.mocks';
import { of, throwError } from 'rxjs';
import { MockTodo } from '@mock-data/todo.mocks';
import { cold } from 'jasmine-marbles';

const serverUrl = 'http://localhost:3000';

describe('TodoService', () => {
  let todoService: TodoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        MockHttpClient.provide
      ]
    });
    todoService = TestBed.get(TodoService);
  });

  test('doit créer le service', () => {
    expect(todoService).toBeTruthy();
  });

  test(`doit retourner la liste des todos`, () => {
    MockHttpClient.mock.get.mockImplementationOnce(() => of([
      MockTodo.completedTodo,
      MockTodo.todoInProgress
    ]));

    const expected = cold('(a|)', {
      a: [
        MockTodo.completedTodo,
        MockTodo.todoInProgress
      ]
    });
    expect(todoService.getAll()).toBeObservable(expected);
    expect(MockHttpClient.mock.get).toHaveBeenCalledWith(`${serverUrl}/todo`);
  });

  test(`doit ajouter un todo`, () => {
    MockHttpClient.mock.post.mockImplementationOnce(() => of(
      MockTodo.todoInProgress
    ));

    const expected = cold('(a|)', {
      a: MockTodo.todoInProgress
    });
    expect(todoService.add(MockTodo.todoInProgress.name)).toBeObservable(expected);
    expect(MockHttpClient.mock.post).toHaveBeenCalledWith(
      `${serverUrl}/todo`,
      { name: MockTodo.todoInProgress.name, completed: false }
    );
  });

  test(`doit mettre à jour un todo`, () => {
    MockHttpClient.mock.put.mockImplementationOnce(() => of(
      MockTodo.todoInProgressUpdated
    ));

    const expected = cold('(a|)', {
      a: MockTodo.todoInProgressUpdated
    });
    expect(todoService.update(MockTodo.todoInProgressUpdated)).toBeObservable(expected);
    expect(MockHttpClient.mock.put).toHaveBeenCalledWith(
      `${serverUrl}/todo/${ MockTodo.todoInProgressUpdated.id }`,
      MockTodo.todoInProgressUpdated
    );
  });

  test(`doit echouer à mettre à jour un todo`, () => {
    MockHttpClient.mock.put.mockImplementationOnce(() => throwError('Custom error'));

    const expected = cold('#', {
    }, 'Custom error');

    expect(todoService.update(MockTodo.todoInProgressUpdated)).toBeObservable(expected);
    expect(MockHttpClient.mock.put).toHaveBeenCalledWith(
      `${serverUrl}/todo/${ MockTodo.todoInProgressUpdated.id }`,
      MockTodo.todoInProgressUpdated
    );
  });
});
