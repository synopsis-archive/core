import {Component, OnInit} from "@angular/core";
import {SearchService} from "../../core/search.service";
import {Plugin, PluginListService} from "mainframe-connector";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  constructor(private searchService: SearchService,
              private pluginService: PluginListService,) {
  }

  public searchterm: string = "";
  public results: Plugin[] = [];

  private plugins: Plugin[] = [];

  search() {
    this.results = this.plugins.filter((x) =>
      x.name.toUpperCase().includes(this.searchterm.toUpperCase()));
  }

  close() {
    this.searchService.isSearchShown.next(false);
  }

  ngOnInit(): void {
    this.pluginService.getPluginList().then((plugins: Plugin[]) => {
      this.plugins = plugins.sort((a, b) => a.name.localeCompare(b.name));
      this.results = this.plugins;
    });
  }
}
