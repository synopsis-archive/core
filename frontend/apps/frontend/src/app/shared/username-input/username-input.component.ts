import {Component} from '@angular/core';

@Component({
  selector: 'app-username-input',
  templateUrl: './username-input.component.html',
 })
export class UsernameInputComponent {
  valid : boolean | null = null
  username: string = "";

  constructor() { }
}
