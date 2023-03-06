import {Component, Input, OnInit} from "@angular/core";
import {tagColors} from "../classes/tagColors";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.css"],
})
export class TagComponent implements OnInit {

  @Input() name: string = "";
  hexColor: string | undefined;

  style: string = "";

  constructor() {}

  ngOnInit(): void {
    this.hexColor = tagColors.get(this.name);

    this.style = `background: ${this.hexColor}40;`;
    this.style += `color: ${this.hexColor};`
    this.style += `border: 0.15em solid ${this.hexColor};`
  }
}
