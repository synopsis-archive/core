import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.css"],
})
export class OnboardingComponent {
  constructor() {}
  stepcount = 3;
  currentstep = 0;

  goToNextStep() {
    if (this.currentstep < this.stepcount) {
      this.currentstep++;
    }
  }
}
