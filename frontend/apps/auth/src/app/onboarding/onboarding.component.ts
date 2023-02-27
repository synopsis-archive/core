import {Component} from "@angular/core";
import { Router } from "@angular/router";
import {OnboardingService} from "../onboarding.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.css"],
})
export class OnboardingComponent {
  eduvidualToken = "";
  step = 1;
  username = "";
  password = "";

  constructor(
    private onboardingService: OnboardingService,
    private router: Router
  ) {
  }


  proceedEduvidual() {
    this.onboardingService.setEduvidualToken(this.eduvidualToken);
    this.step = 3;
    this.router.navigateByUrl("http://localhost:4201");
  }

  proceedLogin() {
    this.onboardingService.login(this.username, this.password);
    this.step = 2;
  }

  toEduvidual() {
    this.step = 2;
  }

  toLogin() {
    this.step = 1;
    this.password = "";
  }

  passwordChanged(pw: string) {
    this.password = pw;
  }
}
