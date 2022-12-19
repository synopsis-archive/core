import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent {
  constructor() {}

  @Input() link: string = "";
  @Input() title: string = "";

}
