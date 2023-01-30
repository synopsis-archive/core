import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'syno-username',
  templateUrl: './syno-username.component.html',
})
export class SynoUsernameComponent {
  valid: boolean | null = null
  username = "";
  @Output() changed = new EventEmitter<string>();

  constructor() {
  }
}
