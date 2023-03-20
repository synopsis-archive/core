import {Component, OnInit} from "@angular/core";
import {
  IDTokenPayload,
  MainframeIdTokenService,
  MainframeNavService,
  Plugin,
  PluginListService,
} from "mainframe-connector";
import {setTagColors} from "core-ui";
import {NavBarService} from "../../core/nav-bar.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: MainframeIdTokenService,
    private pluginService: PluginListService,
    public navService: MainframeNavService,
    public navService1: NavBarService
  ) {
  }

  jwtPayload: IDTokenPayload | undefined;
  showDashboard!: boolean;

  plugins: Plugin[] = [];

  ngOnInit(): void {
    this.pluginService.getPluginList().then((plugins: Plugin[]) => {
      this.plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
      const tags = [...new Set(this.plugins.flatMap((x) => x.tags))];
      setTagColors(tags);
    });

    this.service.getJwt().then((jwt) => {
      this.jwtPayload = this.service.decodeJwt(jwt);
    });

    this.navService.openPlugin(null);
    this.navService1.isListShown.subscribe((x) => {
      this.showDashboard = !x;
    });
    this.showDashboard = !this.navService1.isListShown.getValue();
  }
}
