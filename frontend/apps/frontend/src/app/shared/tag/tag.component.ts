import {Component, Input, OnInit} from "@angular/core";
import {tagColors} from "../classes/tagColors";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html",
  styleUrls: ["./tag.component.css"],
})
export class TagComponent implements OnInit {

  @Input() name: string = "";
  rgbColor: string | undefined;

  style: string = "";

  constructor() {}

  ngOnInit(): void {
    this.rgbColor = tagColors.get(this.name);

    this.style = `background: ${this.rgbColor}40;`;
    this.style += `color: ${this.rgbColor};`
    this.style += `border: 0.15em solid ${this.rgbColor};`
  }
}
