import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {MainframeNavService} from "mainframe-connector";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  isSearchShown = new Subject<boolean>();

  constructor(private navService: MainframeNavService) {}
  toggleIsSearchShown(val: boolean) {
    this.isSearchShown.next(val);
    this.navService.openPlugin(null);
  }
}
