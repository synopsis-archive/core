import {Component} from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
 })
export class EmailInputComponent {
  valid: boolean | null = null
  email: string = "";

  constructor() {}
}
