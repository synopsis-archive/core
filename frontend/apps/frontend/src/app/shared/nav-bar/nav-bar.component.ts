import { Component, OnInit } from "@angular/core";
import {OpenPlugin} from "../classes/openPlugins";
import {NavBarService} from "../../core/nav-bar.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit{
  // tabs: string[] = ["Home", "Kirtag in Lambrechten", "Netzteil sprengen"];
  tabs: OpenPlugin[] = [];
  public val: string = "";
  showSearchBar: boolean = false;
  viewGrid: boolean = true;
  openTab: string = "Home";

  constructor(private navService: NavBarService) {}

  ngOnInit(): void {
    this.val = "nav";
    this.navService.openPlugins.subscribe(x => this.tabs = x);
    this.navService.getPlugins();
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
    // this.tabs = this.tabs.filter(x => x !== tab);
  }

  open(tab: string) {
    this.openTab = tab;
    // show tab
  }
}

export let openPlugins: OpenPlugin[] = [];
