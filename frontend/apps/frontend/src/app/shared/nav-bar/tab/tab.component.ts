import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent {
  constructor() {}

  @Input() link: string = "";
  @Input() title: string = "";
  @Input() isActive: boolean = false;
  @Output() closeTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() openTab: EventEmitter<string> = new EventEmitter<string>();

  closeTabClick() {
    this.closeTab.emit("close");
  }

  showTab(): void {
    this.openTab.emit("show");
  }
}
