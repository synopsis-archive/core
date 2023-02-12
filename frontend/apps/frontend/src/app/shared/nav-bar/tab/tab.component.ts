import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivePlugin } from "../../classes/activePlugin";
import { NavBarService } from "../../../core/nav-bar.service";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
})
export class TabComponent implements OnInit {
  @Input() plugin: ActivePlugin | null = null;
  // @Input() link: string = "";
  @Input() title: string = "adfasdf";
  @Input() isActive: boolean = false;
  // @Output() closeTab: EventEmitter<string> = new EventEmitter<string>();
  // @Output() openTab: EventEmitter<string> = new EventEmitter<string>();
  closable: boolean = true;

  constructor(private navService: NavBarService) {}
  ngOnInit(): void {
    this.closable = this.plugin?.id !== "home";
  }

  closeTabClick() {
    this.navService.closePlugin(this.plugin?.id);
    this.navService.activatePlugin("home");
  }

  showPlugin(): void {
    this.navService.activatePlugin(this.plugin?.id);
  }
}
