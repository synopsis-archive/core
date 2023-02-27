import {Component, OnInit} from "@angular/core";
import {NavBarService} from "./core/nav-bar.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";
  showSearch: boolean = false;

  constructor(private navService: NavBarService) {
  }

  ngOnInit(): void {
    this.showSearch = this.navService.showSearch.getValue();
    this.navService.showSearch.subscribe(x => this.showSearch = x);
  }
}
