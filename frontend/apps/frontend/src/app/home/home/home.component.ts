import {Component, OnInit} from "@angular/core";
import {
  IDTokenPayload,
  MainframeIdTokenService,
  PluginListService,
  Plugin
} from "mainframe-connector";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private service: MainframeIdTokenService, private pluginService: PluginListService) {
  }

  plugins: Plugin[] = [];

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

  pluginList: any;

  ngOnInit(): void {
    this.pluginService.getPluginList().then(plugins => {
      this.pluginList = plugins;
    });
    this.service.getJwt().then(jwt=>{
      this.jwtPayload = this.service.decodeJwt(jwt);
    });
  }
}
