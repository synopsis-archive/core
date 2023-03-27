import {Component, Input, OnInit} from "@angular/core";
import {IDTokenPayload, MainframeIdTokenService} from "mainframe-connector";
import {Plugin} from "mainframe-connector";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  @Input() plugins: Plugin[] = [];

  constructor() {
  }

  categories: Category[] = [];

  ngOnInit(): void {
    this.categories = [
      new Category("Favoriten", "star"),
      new Category("Meine", "user-search"),
      new Category("Bald fällig", "hourglass-low"),
      new Category("Alle", "border-all")];
  }
}

export class Category {
  constructor(
    public name: string | null,
    public icon: string) {
  }
}
