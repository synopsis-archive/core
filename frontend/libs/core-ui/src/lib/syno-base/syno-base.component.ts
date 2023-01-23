import {Component, Input} from "@angular/core";

@Component({
  selector: "syno-base",
  templateUrl: "./syno-base.component.html",
  styleUrls: ["./syno-base.component.css"],
})
export class SynoBaseComponent {
  @Input() variant = "";
  @Input() disabled = false;
  @Input() includeClasses = "";
  @Input() excludeClasses = "";

  setClass(styles: Record<string, string>) {
    let style = styles["default"];

    this.variant = this.variant.toLowerCase().trim();
    if (this.variant in styles) style = styles[this.variant];
    if (this.disabled) style = styles["disabled"];

    style += " " + this.includeClasses;
    this.excludeClasses.split(" ").forEach(e => style = style.replace(e, ""));
    style = style.replace(new RegExp(/\s{2,}/), " ");

    return style;
  }
}
