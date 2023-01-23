import {Component} from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
 })
export class PasswordInputComponent {
  valid : boolean | null = null
  password: string = "";

  constructor() { }
}
