import { Component } from "@angular/core";
import {SearchService} from "../../core/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  constructor(private searchService: SearchService) {}
  public searchterm: string = "";

  search() {
    console.log(this.searchterm);
  }

  close() {
    this.searchService.isSearchShown.next(false);
  }
}
