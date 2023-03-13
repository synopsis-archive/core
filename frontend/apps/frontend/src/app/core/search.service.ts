import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  isSearchShown = new Subject<boolean>();

  constructor() {}
  toggleIsSearchShown(val: boolean) {
    this.isSearchShown.next(val);
  }
}
