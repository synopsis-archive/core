import {Component, Input, OnInit} from "@angular/core";
import {IDTokenPayload, MainframeIdTokenService} from "mainframe-connector";
import {Plugin} from "../../shared/classes/plugin";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {

  @Input() plugins: Plugin[] = [];

  constructor() {
  }

  courses: Category[] = [];
  getNewCategory = (name: string, icon: string) => new Category( name, `../../../assets/icons/${icon}`);

  ngOnInit(): void {
    this.courses = [
      this.getNewCategory('Favoriten', 'star.svg'),
      this.getNewCategory('Meine', 'user-search.svg'),
      this.getNewCategory('Bald fällig', 'hourglass-low.svg'),
      this.getNewCategory('Alle', 'border-all.svg')];
  }
}

export class Category {
  constructor(
    public name: string | null,
    public icon: string | null) {
  }
}
