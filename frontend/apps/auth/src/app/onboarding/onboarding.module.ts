import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { OnboardingComponent } from "./onboarding.component";
import { LoginModule } from "../login/login.module";

@NgModule({
  declarations: [OnboardingComponent],
  bootstrap: [OnboardingComponent],
  imports: [CommonModule, OnboardingRoutingModule, LoginModule],
})
export class OnboardingModule {}
