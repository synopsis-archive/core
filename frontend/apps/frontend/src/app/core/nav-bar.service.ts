import { Injectable } from"@angular/core";
import {Subject} from "rxjs";
import {OpenPlugin} from "../shared/classes/openPlugins";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NavBarService {

  openPlugins = new Subject<OpenPlugin[]>();

  private _openPlugins: OpenPlugin[] = [{id: "home", name: "Home", active: true}]
  constructor(private router: Router) { }

  getPlugins() {
    this.openPlugins.next(this._openPlugins);
  }

  openPlugin(plugin: OpenPlugin) {
    this._openPlugins.push(plugin);
    this.activatePlugin(plugin.id);
  }

  closePlugin(id: string) {
    this.openPlugins.next(this._openPlugins.filter(p => p.id !== id));
  }

  activatePlugin(id: string) {
    this._openPlugins.forEach(x => x.active = x.id === id);
    this.openPlugins.next(this._openPlugins);
    if (id === "home") this.router.navigate(["/"]);
    else this.router.navigate(["/plugin/" + id]);
  }
}
