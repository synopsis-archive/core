import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  checked: boolean = true
  constructor() {}

  ngOnInit(): void {
    return;
  }
  click(){
    console.log(this.checked)
  }
}
