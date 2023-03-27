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
import {UserService} from "../../core/user.service";

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
    public navBarService: NavBarService,
    public userService: UserService
  ) {}

  jwtPayload: IDTokenPayload | undefined;
  showDashboard!: boolean;

  plugins: Plugin[] = [];
  private _plugins: Plugin[] = [];

  ngOnInit(): void {
    this.userService.favorites.subscribe(x => {
      this._plugins.forEach(plugin => plugin.isFavourite = false);
      x.forEach(fav => {
        this._plugins.find(p => p.id === fav.pluginID)!.isFavourite = true;
      });
      this.plugins = this._plugins;
    });


    this.pluginService.getPluginList().then(async (plugins: Plugin[]) => {
      this._plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
      const tags = [...new Set(this._plugins.flatMap((x) => x.tags))];
      setTagColors(tags);

      await this.userService.getFavorites();
    })

    this.service.getJwt().then((jwt) => {
      this.jwtPayload = this.service.decodeJwt(jwt);
    });

    this.navService.openPlugin(null);
    this.navBarService.isListShown.subscribe((x) => {
      this.showDashboard = !x;
    });
    this.showDashboard = !this.navBarService.isListShown.getValue();
  }
}
