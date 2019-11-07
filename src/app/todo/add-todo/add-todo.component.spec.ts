import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { MockModule } from 'ng-mocks';
import { MockAddTodoHostComponent } from '@mock-data/components/add-todo-host.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const getButtonInstance = <T>(fixture: ComponentFixture<T>) =>
  fixture.debugElement.query(By.css('button')).componentInstance as HTMLButtonElement;

const fillInput = <T>(fixture: ComponentFixture<T>, selector: string, value: string)  => {
  const nameInput = fixture.debugElement.query(By.css(selector));
  nameInput.nativeElement.value = value;
  nameInput.nativeElement.dispatchEvent(new Event('input'));
};

describe('AddTodoComponent', () => {

  let component: MockAddTodoHostComponent;
  let fixture: ComponentFixture<MockAddTodoHostComponent>;
  let addTodoChangedSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockAddTodoHostComponent,
        AddTodoComponent
      ],
      imports: [
        ReactiveFormsModule,
        MockModule(MatInputModule),
        MockModule(MatButtonModule)
      ]
    });

    fixture = TestBed.createComponent(MockAddTodoHostComponent);
    component = fixture.componentInstance;
    addTodoChangedSpy = jest.spyOn(component, 'addTodo');
    fixture.detectChanges();
  });

  afterEach(() => {
    addTodoChangedSpy.mockClear();
  });

  test('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  test(`ne doit pas activer le bouton si le nom est trop court`, () => {
    fillInput(fixture, 'input', '123');
    fixture.detectChanges();

    const addButton = getButtonInstance(fixture);
    expect(addButton.disabled).toBeTruthy();
  });

  test(`doit etre désactivé par default`, () => {
    const addButton = getButtonInstance(fixture);
    expect(addButton.disabled).toBeTruthy();
  });

  test(`doit activer le bouton si le nom est assez long`, () => {
    fillInput(fixture, 'input', '12345');
    fixture.detectChanges();

    const addButton = getButtonInstance(fixture);
    expect(addButton.disabled).toEqual(false);
  });

  describe(`Évènements sur bouton d'ajout`, () => {
    beforeEach(() => {
      fillInput(fixture, 'input', '12345');
      fixture.detectChanges();

      const addButton = fixture.debugElement.query(By.css('button'));
      addButton.triggerEventHandler('click', {});
      fixture.detectChanges();
    });

    test(`doit émettre un evènement sur le click`, () => {
      expect(component.addTodo).toHaveBeenCalledWith('12345');
    });

    test(`doit reset l'input sur le click`, () => {
      const nameInputUpdated = fixture.debugElement.query(By.css('input'));
      const addButtonInstance = getButtonInstance(fixture);
      expect(nameInputUpdated.nativeElement.innerHTML).not.toContain('12345');
      expect(addButtonInstance.disabled).toBeTruthy();
    });
  });
});
