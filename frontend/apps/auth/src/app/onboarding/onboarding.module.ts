import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OnboardingRoutingModule } from "./onboarding-routing.module";
import { OnboardingComponent } from "./onboarding.component";
import { LoginModule } from "../login/login.module";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "../login/login.component";
import { StepperComponent } from "./stepper/stepper.component";

@NgModule({
  declarations: [OnboardingComponent, StepperComponent],
  imports: [CommonModule, SharedModule, OnboardingRoutingModule, LoginModule],
  bootstrap: [OnboardingComponent],
})
export class OnboardingModule {}
