import { TodoComponent } from './todo.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MockComponent } from 'ng-mocks';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FilterTodoComponent } from './filter-todo/filter-todo.component';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { TodoState } from './+state/todo.state';
import { TodoInterface } from './todo.interface';
import { MockTodoState } from '@mock-data/todo-state.mocks';
import { TodoActions } from './+state/todo.actions';


describe('TodoComponent', () => {

  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: Store;
  let mockStoreSelect;
  let mockDispatch;

  const loadingSubject = new Subject<boolean>();
  const todoListSubject = new BehaviorSubject<TodoInterface.Todo[]>([]);
  const todoListFilterSubject = new BehaviorSubject<TodoInterface.Filter>(null);
  const todoList = MockTodoState.withTodoList.todoList;
  const todoListFilter = MockTodoState.withTodoList.filter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
        MockComponent(TodoListItemComponent),
        MockComponent(TodoListComponent),
        MockComponent(AddTodoComponent),
        MockComponent(FilterTodoComponent),
      ],
      imports: [NgxsModule.forRoot([])],
    });
    store = TestBed.get(Store);
    mockStoreSelect = jest.spyOn(store, 'select');
    mockStoreSelect.mockImplementation(v => {
      switch (v) {
        case TodoState.loaded:
          return loadingSubject;
        case TodoState.todoList:
          return todoListSubject;
        case TodoState.filter:
          return todoListFilterSubject;
      }
    });
    mockDispatch = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
   mockStoreSelect.mockRestore();
  });

  test('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  describe('quand les tâches ne sont pas chargées', () => {
    test(`doit afficher le message d'attente`,
    () => {
      loadingSubject.next(false);
      const title = fixture.debugElement.query(By.css('.container .content'))
        .nativeElement
        .textContent.trim();
      expect(title).toEqual('En cours de chargement...');
    });
  });

  describe('quand les tâches sont chargées', () => {
    beforeEach(() => {
      loadingSubject.next(true);
      todoListSubject.next(todoList);
      todoListFilterSubject.next(todoListFilter);
      fixture.detectChanges();
    });

    test(`doit afficher le titre`, () => {
      const title = fixture.debugElement.
      query(By.css('.container .header h2')).nativeElement.innerHTML.trim();
      expect(title).toEqual('Beautiful Todo List');
    });

    test(`doit afficher la liste des tâches`,  () => {
      const appTodoListComponent = fixture.debugElement.
      query(By.css('app-todo-list')).componentInstance;
      expect(appTodoListComponent.todoList).toEqual(todoList);
    });

    test(`doit afficher le filtre`, () => {
      const appTodoFilterComponent = fixture.debugElement
        .query(By.css('app-filter-todo')).componentInstance;
      expect(appTodoFilterComponent.filter).toEqual(todoListFilter);
    });
  });

  describe('quand il y a des évènements', () => {
    beforeEach(() => {
      loadingSubject.next(true);
      todoListSubject.next(todoList);
      todoListFilterSubject.next(todoListFilter);
      fixture.detectChanges();
    });

    test(`doit émettre une action lors de la création du composant`, () => {
      expect(store.dispatch).toHaveBeenCalledWith(new TodoActions.GetAll());
    });

    test(`doit émettre une action lors d'un clic sur une tâche`, () => {
        const todoListComponent = fixture.debugElement
          .query(By.css('app-todo-list'));
        todoListComponent.triggerEventHandler('todoClicked', todoList[0]);
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledWith(new TodoActions.ChangeStatus(todoList[0].id));
    });

    test(`doit émettre une action lors de la création d'un todo`, () => {
      const addTodoComponent = fixture.debugElement
        .query(By.css('app-add-todo'));
      addTodoComponent.triggerEventHandler('addTodo', 'philouuuuuu');
      fixture.detectChanges();
      expect(store.dispatch)
        .toHaveBeenCalledWith(new TodoActions.Add('philouuuuuu'));
    });

    test(`doit émettre une action lors d'un changement de filtre`, () => {
      const filterComponent = fixture.debugElement
        .query(By.css('app-filter-todo'));
      filterComponent.triggerEventHandler('filterChanged',
        TodoInterface.Filter.COMPLETED);
      fixture.detectChanges();
      expect(store.dispatch)
        .toHaveBeenCalledWith(new TodoActions.Filter(TodoInterface.Filter.COMPLETED));
    });
  });
});
