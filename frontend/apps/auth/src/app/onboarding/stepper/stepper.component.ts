import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.css"],
})
export class StepperComponent {
  constructor() {}
  @Input()
  stepcount = 3;
  @Input()
  currentstep = 1;
  stepbarlength = 800;
}
