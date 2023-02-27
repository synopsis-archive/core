import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ActivePlugin } from "../shared/classes/activePlugin";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class NavBarService {
  openPlugins = new Subject<ActivePlugin[]>();
  isListShown = new Subject<boolean>();
  private _openPlugins: ActivePlugin[] = [
    new ActivePlugin("home", "Home", true),
  ];

  constructor(private router: Router) {}

  getPlugins() {
    this.openPlugins.next(this._openPlugins);
  }

  openPlugin(plugin: ActivePlugin) {
    this._openPlugins.push(plugin);
    this.activatePlugin(plugin.id);
  }

  closePlugin(id: string | undefined) {
    if (!id) return;
    this._openPlugins = this._openPlugins.filter((p) => p.id !== id);
    this.openPlugins.next(this._openPlugins);
  }

  activatePlugin(id: string | undefined) {
    if (!id) return;
    this._openPlugins.forEach((x) => (x.active = x.id === id));
    this.openPlugins.next(this._openPlugins);
    if (id === "home") this.router.navigate(["/"]);
    else this.router.navigate(["/plugin/" + id]);
  }

  toggleIsListShown() {
    this.isListShown.next(!this.isListShown);
  }
  getIsListShown() {
    return this.isListShown;
  }
}
