import {Component} from "@angular/core";
import {Router} from "@angular/router";
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
  error: null | string = null;

  constructor(
    private onboardingService: OnboardingService,
  ) {
  }

  // TODO: add error handling

  proceedEduvidual() {
    this.onboardingService.setEduvidualToken(this.eduvidualToken).then(_ => {
    }).catch(_ => {
      this.error = "Token konnte nicht gespeichert werden!";
      return;
    });
  }

  proceedLogin() {
    this.onboardingService.login(this.username, this.password, false).then(_ => {
      this.step = 2;
    }).catch(_ => {
      this.error = "Anmeldung fehlgeschlagen!";
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
