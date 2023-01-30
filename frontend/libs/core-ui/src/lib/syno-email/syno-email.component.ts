import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: "syno-email",
  templateUrl: "./syno-email.component.html",
})
export class SynoEmailComponent {
  valid: boolean | null = null
  email = "";
  @Output() changed = new EventEmitter<string>();
  @Output() isValid = new EventEmitter<boolean | null>();

  constructor() {
  }
}
