import {Component, OnInit} from "@angular/core";
import {SearchService} from "./core/search.service";
import {Plugin, PluginListService} from "mainframe-connector";
import {setTagColors} from "./shared/tagColors";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";
  isSearchShown: boolean = false;

  constructor(public searchService: SearchService, private pluginService: PluginListService) {}
  ngOnInit(): void {
    this.searchService.isSearchShown.subscribe((x) => {
      this.isSearchShown = x;
    });

    this.pluginService.getPluginList().then((plugins: Plugin[]) => {
      const tags = [...new Set(plugins.flatMap(x => x.tags))];
      setTagColors(tags);
    });
  }
}
