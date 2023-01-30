import {Component, EventEmitter, Input, Output} from "@angular/core";
import {OpenPlugin} from "../../classes/openPlugins";
import {NavBarService} from "../../../core/nav-bar.service";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent {
  constructor(private navService: NavBarService) {}

  @Input() plugin: OpenPlugin = null!;
  // @Input() link: string = "";
  // @Input() title: string = "";
  // @Input() isActive: boolean = false;
  @Output() closeTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() openTab: EventEmitter<string> = new EventEmitter<string>();
  @Input() closable: boolean = true;

  closeTabClick() {
    this.navService.closePlugin(this.plugin.id);
    this.navService.activatePlugin("home");
  }

  showPlugin(): void {
    this.navService.activatePlugin(this.plugin.id);
  }
}
