import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { MainframeNavService, Plugin } from "mainframe-connector";
import { Router } from "@angular/router";
import { NavBarService } from "../../core/nav-bar.service";

@Component({
  selector: "app-plugin",
  templateUrl: "./plugin.component.html",
  styleUrls: ["./plugin.component.scss"],
})
export class PluginComponent {
  background: string = "";
  name: string = "";
  id: string = null!;

  @Input() set plugin(plugin: Plugin) {
    this.background = `background-image: linear-gradient(#00000000,#000000aa), url(${plugin.image})`;
    this.name = plugin.name;
    this.id = plugin.id;
  }

  constructor(private navService: NavBarService) {}

  open() {
    this.navService.openPlugin({
      id: this.id,
      name: this.name,
      active: true,
    });
  }
}
