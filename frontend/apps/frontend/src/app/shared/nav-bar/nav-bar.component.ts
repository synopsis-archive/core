import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",

  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  tabs: string[] = ["Home", "Kirtag in Lambrechten", "Netzteil sprengen"];
  public val: string = "";
  showSearchBar: boolean = false;
  viewGrid: boolean = true;
  openTab: string = "Home";

  constructor() {}

  ngOnInit(): void {
    this.val = "nav";
  }

  searchClicked() {
    this.showSearchBar = !this.showSearchBar;
  }

  changeView() {
    this.viewGrid = !this.viewGrid;
  }

  showSettings() {
    // go to settings screen
  }

  closeTab(tab: string) {
    this.tabs = this.tabs.filter((x) => x !== tab);
  }

  open(tab: string) {
    this.openTab = tab;
    // show tab
  }

  closeSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }
}
