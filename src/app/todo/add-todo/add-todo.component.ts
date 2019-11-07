import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  template: `
    <div>
      <mat-form-field class="name">
        <input #name matInput placeholder="name" [formControl]="nameFormControl">
      </mat-form-field>

      <button mat-flat-button (click)="addClicked()" color="primary"
              [disabled]="!nameFormControl.valid">
        Ajouter
      </button>
    </div>
  `,
  styles: [`
    .name {
      margin-right: 8px;
    }`]
})
export class AddTodoComponent {
  @Output() addTodo: EventEmitter<string> = new EventEmitter<string>();

  nameFormControl: FormControl = new FormControl('', [ Validators.required, Validators.minLength(4)]);
  constructor() {}

  public addClicked(): void {
    this.addTodo.emit(this.nameFormControl.value);
    this.nameFormControl.reset();
  }

}
