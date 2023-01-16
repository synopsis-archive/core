import { Component, Input, OnInit } from "@angular/core";

interface TabType {
  id: number;
  name: string;
  icon: string;
}

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  @Input()
  selectedId: number = 0;

  @Input()
  tabs: TabType[] = [];

  @Input()
  onTabClick: (id: number) => void = () => {};

  ngOnInit(): void {
    this.selectedId = 0;
  }
}
