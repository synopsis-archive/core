import {Component, Input, OnInit} from "@angular/core";
import {Plugin} from "mainframe-connector";
import {UserService} from "../../core/user.service";

@Component({
  // eslint-disable-next-line  @angular-eslint/component-selector
  selector: "tr[app-list-view-item]",
  templateUrl: "./list-view-item.component.html",
  styleUrls: ["./list-view-item.component.css"],
})
export class ListViewItemComponent {

  @Input() plugin!: Plugin;

  constructor(private userService: UserService) {}

  async changeFavorite() {
    this.plugin.isFavourite = !this.plugin.isFavourite;
    if (this.plugin.isFavourite) await this.userService.addFavorite(this.plugin.id);
    else await this.userService.deleteFavorite(this.plugin.id);
  }
}
