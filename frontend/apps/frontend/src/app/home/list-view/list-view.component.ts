import {Component, Input, OnInit} from "@angular/core";
import {Plugin} from "mainframe-connector";
import {NavBarService} from "../../core/nav-bar.service";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.css"],
})
export class ListViewComponent {

  _plugins: Plugin[] = [];
  @Input() set plugins(plugins: Plugin[]) {
    this._plugins = plugins;
  };

  titleAsc: boolean = true;

  constructor(private navService: NavBarService) {}

  sortPlugins() {
    this._plugins = this._plugins.sort((a,b) =>
      this.titleAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }

  open(plugin: Plugin) {
    this.navService.openPlugin({
      id: plugin.id,
      name: plugin.name,
      active: true
    });
  }
}
