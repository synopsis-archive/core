import {Component} from '@angular/core';

@Component({
  selector: 'syno-email',
  templateUrl: './syno-email.component.html',
 })
export class SynoEmailComponent {
  valid: boolean | null = null
  email = "";

  constructor() {}
}
