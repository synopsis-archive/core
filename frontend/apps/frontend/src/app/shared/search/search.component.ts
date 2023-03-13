import { Component } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  constructor() {}
  public searchterm: string = "";

  search() {
    console.log(this.searchterm);
  }
}
