import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {MainframeNavService} from "mainframe-connector";

@Component({
  selector: "app-plugin",
  templateUrl: "./plugin.component.html",
  styleUrls: ["./plugin.component.scss"],
})
export class PluginComponent {

  background: string = "";

  @Input() set imageSrc (src: string | null) {
    this.background = `background-image: linear-gradient(#00000000,#000000aa), url(${src})`;
  };
  @Input() name: string | null = "";
  @Input() id: string = null!;

  constructor(private navService: MainframeNavService) {}

  open() {
    this.navService.openPlugin(this.id);
  }
}
