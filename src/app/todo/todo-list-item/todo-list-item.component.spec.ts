import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import { Component, DebugElement } from '@angular/core';
import { TodoInterface } from '../todo.interface';
import { By } from '@angular/platform-browser';

@Component({
  template: '<app-todo-list-item [todo]="todo" (todoClicked)="onTodoClicked()"></app-todo-list-item>'
})
class HostComponent {
  todo: TodoInterface.Todo = {
    name: 'rentrer sur marseille',
    completed: true,
    id: '13'
  };
  onTodoClicked = jest.fn();
}


describe('TodoListItemComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let todoItem: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListItemComponent,
        HostComponent
      ]
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    todoItem = fixture.debugElement.query(By.css('.todo'));
  });

  test('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  test(`doit afficher le todo`, () => {
    const todoName = todoItem.nativeElement.innerHTML.trim();
    expect(todoName).toEqual('rentrer sur marseille');
  });

  test(`doit émettre un evènement sur le clic`, () => {
    todoItem.triggerEventHandler('click', {});
    expect(component.onTodoClicked).toHaveBeenCalled();
  });

  test(`doit barrer le todo s'il est terminé`, () => {
    const todoListItem = fixture.debugElement.query(By.css('.status-completed'));
    expect(todoListItem).toBeTruthy();
  });
});
