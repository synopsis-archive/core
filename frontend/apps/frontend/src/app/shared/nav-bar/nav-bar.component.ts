import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivePlugin } from "../classes/activePlugin";
import { NavBarService } from "../../core/nav-bar.service";
import { User } from "../classes/user";
import { SearchService } from "../../core/search.service";

@Component({
  selector: "app-nav-bar",

  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  tabs: ActivePlugin[] = [];
  public val: string = "";
  viewGrid: boolean = true;

  constructor(
    private navService: NavBarService,
    private changeDetection: ChangeDetectorRef,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.val = "nav";
    this.navService.openPlugins.subscribe((x) => {
      this.tabs = x;
      this.changeDetection.detectChanges();
    });
    this.navService.getPlugins();
  }

  closeTabClick(plugin: ActivePlugin) {
    this.navService.closePlugin(plugin.id);
    this.navService.activatePlugin("home");
  }

  showPlugin(plugin: ActivePlugin): void {
    this.navService.activatePlugin(plugin.id);
  }

  searchClicked() {
    this.searchService.toggleIsSearchShown(true);
  }

  changeView() {
    this.viewGrid = !this.viewGrid;
    this.navService.toggleIsListShown(this.viewGrid);
  }

  showSettings() {
    // go to settings screen
  }
}
