import {Component, Input} from "@angular/core";

@Component({
  selector: "syno-base",
  templateUrl: "./syno-base.component.html",
  styleUrls: ["./syno-base.component.css"],
})
export class SynoBaseComponent {
  @Input() includeClasses = "";
  @Input() excludeClasses = "";
}
