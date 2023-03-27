import {Component, Input, OnInit} from "@angular/core";
import {Plugin} from "mainframe-connector";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {

  @Input() plugins: Plugin[] = [];
  @Input() title: string | null = "";
  @Input() icon: string = "";

  hidden: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.hidden = true;
  }
}
