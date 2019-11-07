import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterTodoComponent } from './filter-todo.component';
import { MockComponent } from 'ng-mocks';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material';
import { MockFilterTodoHostComponent } from '@mock-data/components/filter-host.component';
import { By } from '@angular/platform-browser';
import { TodoInterface } from '../todo.interface';

describe('FilterTodoComponent', () => {
  let component: MockFilterTodoHostComponent;
  let fixture: ComponentFixture<MockFilterTodoHostComponent>;

  let filterChangedSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockFilterTodoHostComponent,
        FilterTodoComponent,

        MockComponent(MatButtonToggle),
        MockComponent(MatButtonToggleGroup),
      ]
    });

    fixture = TestBed.createComponent(MockFilterTodoHostComponent);
    component = fixture.componentInstance;

    component.filterChanged = jest.fn();
    filterChangedSpy = jest.spyOn(component, 'filterChanged');
    fixture.detectChanges();
  });

  afterEach(() => {
    filterChangedSpy.mockClear();
  });

  test('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  test(`doit afficher 3 boutons`, () => {
    const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
    expect(buttons.length).toEqual(3);
  });

  test('doit transmettre le filtre au toggle-group', () => {
    component.filter = TodoInterface.Filter.ALL;

    fixture.detectChanges();
    const mockGroup = fixture.debugElement.query(By.css('mat-button-toggle-group')).componentInstance as MatButtonToggleGroup;

    expect(mockGroup.value).toEqual(TodoInterface.Filter.ALL);
  });

  test.each([
    [TodoInterface.Filter.ALL, 'Tous', 1],
    [TodoInterface.Filter.IN_PROGRESS, 'En cours', 2],
    [TodoInterface.Filter.COMPLETED, 'Terminées', 3],
  ])(`doit émettre %s sur le clic sur %s`, (expected, displayed, order) => {
    const button = fixture.debugElement.query(By.css(`mat-button-toggle:nth-of-type(${order})`));
    button.triggerEventHandler('click', {});

    fixture.detectChanges();

    expect(filterChangedSpy).toHaveBeenCalledWith(expected);
    expect(button.nativeElement.innerHTML).toContain(displayed);
  });

});
