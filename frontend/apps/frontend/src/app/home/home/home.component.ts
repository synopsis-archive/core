import { Component, OnInit } from "@angular/core";
import {
  IDTokenPayload,
  MainframeIdTokenService,
  MainframeNavService,
  PluginListService,
  Plugin,
} from "mainframe-connector";
import { setTagColors } from "../../shared/classes/tagColors";
import { NavBarService } from "../../core/nav-bar.service";

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
  ) {}

  jwtPayload: IDTokenPayload | undefined;
  showDashboard: boolean = true;

  // getNewPlugin = (name: string, image: string) => new Plugin( name, [], null, null, null, null, `../../../assets/images/${image}`);
  //
  // plugins: Plugin[] = [
  // this.getNewPlugin('BeReal Anfängerkurs', 'nodla.jpeg'),
  // this.getNewPlugin('Kirtag in Lambrechten', 'wiesn.jpg'),
  // this.getNewPlugin('Beamer hi mochn', 'heimooo.jpg'),
  // this.getNewPlugin('Zugbremse reparieren', 'BeReal.jpeg'),
  // this.getNewPlugin('Roboter-Quartett mit Sperrer', 'loata.jpeg'),
  // this.getNewPlugin('Schuhkressenbauer', 'schuhkressenbauer.jpg'),
  // this.getNewPlugin('Minecraft Modpacks', 'simon.jpeg'),
  // this.getNewPlugin('MIchael?', 'miche2.JPG'),
  // this.getNewPlugin('Chayacheck', 'groans.JPG'),
  // this.getNewPlugin('periodischer Chill', 'chille.jpg'),
  // this.getNewPlugin('ORF interview', 'meeting.jpg')
  // ];

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
      this.showDashboard = x;
    });
  }

  buttonPressed() {
    console.log("button pressed");
  }
}
