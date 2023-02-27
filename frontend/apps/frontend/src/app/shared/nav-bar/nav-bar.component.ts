import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ActivePlugin} from "../classes/activePlugin";
import {NavBarService} from "../../core/nav-bar.service";
import {User} from "../classes/user";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit{
  tabs: ActivePlugin[] = [];
  public val: string = "";
  showSearchBar: boolean = false;
  viewGrid: boolean = true;

  constructor(private navService: NavBarService,
              private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.val = "nav";
    this.navService.openPlugins.subscribe(x => {
      this.tabs = x;
      this.changeDetection.detectChanges();
    });
    this.navService.getPlugins();
  }

  searchClicked() {
    this.showSearchBar = !this.showSearchBar;
    this.navService.openSearch(this.showSearchBar);
  }

  changeView() {
    this.viewGrid = !this.viewGrid;
    this.navService.changeView(this.viewGrid);
  }

  showSettings() {
    // go to settings screen
  }
}
