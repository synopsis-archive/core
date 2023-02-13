import { Component, OnInit } from "@angular/core";
import { NavBarService } from "./core/nav-bar.service";
import { IconsModule } from "./icons/icons.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";
  searchViewShown = false;

  constructor(private nbs: NavBarService, private ics: IconsModule) {}
  ngOnInit(): void {
    this.nbs.searchPluginViewShown.subscribe((x) => {
      this.searchViewShown = x;
    });
  }
}
