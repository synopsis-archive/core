import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Plugin} from "mainframe-connector";
import {NavBarService} from "../../core/nav-bar.service";
import {SearchService} from "../../core/search.service";
import {UserService} from "../../core/user.service";

@Component({
  selector: "app-grid-plugin",
  templateUrl: "./grid-plugin.component.html",
  styleUrls: ["./grid-plugin.component.css"],
})
export class GridPluginComponent {
  background: string = "";
  name: string = "";
  id: string = null!;
  isFavorite: boolean = false;

  @Input() set plugin(plugin: Plugin) {
    this.background = `background-image: linear-gradient(#00000000,#000000aa), url(${plugin.image})`;
    this.name = plugin.name;
    this.id = plugin.id;
    this.isFavorite = plugin.isFavourite;
  }

  constructor(private navService: NavBarService,
              private searchService: SearchService,
              private userService: UserService) {}

  open() {
    this.searchService.isSearchShown.next(false);
    this.navService.openPlugin({
      id: this.id,
      name: this.name,
      active: true,
    });
  }

  changeFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) this.userService.addFavorite(this.id);
    else this.userService.deleteFavorite(this.id);
    this.userService.getFavorites();
  }
}
