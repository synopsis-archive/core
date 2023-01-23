import {Component} from '@angular/core';

@Component({
  selector: 'syno-password',
  templateUrl: './syno-password.component.html',
 })
export class SynoPasswordComponent {
  valid: boolean | null = null
  password = "";

  constructor() { }
}
