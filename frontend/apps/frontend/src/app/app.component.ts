import { Component, OnInit } from "@angular/core";
import { NavBarService } from "./core/nav-bar.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";
  searchViewShown = false;

  constructor(private nbs: NavBarService) {}
  ngOnInit(): void {
    this.nbs.searchPluginViewShown.subscribe((x) => {
      this.searchViewShown = x;
    });
  }
}
