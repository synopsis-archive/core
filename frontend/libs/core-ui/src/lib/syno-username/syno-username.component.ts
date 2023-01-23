import {Component} from '@angular/core';

@Component({
  selector: 'syno-username',
  templateUrl: './syno-username.component.html',
 })
export class SynoUsernameComponent {
  valid : boolean | null = null
  username = "";

  constructor() { }
}
