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
    this.onboardingService.setEduvidualToken(this.eduvidualToken).then(_ => {
      this.router.navigateByUrl("http://localhost:4201");
    }).catch(error => {
      console.error(error);
      return;
    });
  }

  proceedLogin() {
    this.onboardingService.login(this.username, this.password).then(_ => {
      this.step = 2;
    }).catch(error => {
      console.error(error);
      return;
    });
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
