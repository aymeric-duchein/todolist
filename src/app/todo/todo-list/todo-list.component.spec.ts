import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { MockComponent } from 'ng-mocks';
import { MatList, MatListItem } from '@angular/material';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { By } from '@angular/platform-browser';
import { TodoListHostComponent } from '@mock-data/components/todo-list-host.component';
import { DebugElement } from '@angular/core';

describe('TodoListComponent', () => {
  let component: TodoListHostComponent;
  let fixture: ComponentFixture<TodoListHostComponent>;
  let listTodos: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListHostComponent,
        TodoListComponent,
        MockComponent(TodoListItemComponent),
        MockComponent(MatList),
        MockComponent(MatListItem)
      ]
    });
    fixture = TestBed.createComponent(TodoListHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    listTodos = fixture.debugElement.queryAll(By.css('app-todo-list-item'));
  });

  test('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  test(`doit afficher la liste des todo`, () => {
    expect(listTodos.length).toEqual(2);
  });

  test(`doit transmettre un évènement lors du click sur un todo`, () => {
    listTodos.forEach((todoComponent) => {
      const todo = todoComponent.componentInstance.todo;
      todoComponent.triggerEventHandler('todoClicked', todo);
      expect(component.onTodoClicked).toHaveBeenCalledWith(todo);
    });
  });
});
