import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OnboardingRoutingModule} from "./onboarding-routing.module";
import {OnboardingComponent} from "./onboarding.component";
import {LoginModule} from "../login/login.module";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {CoreUiLibModule} from "@htl-grieskirchen-core/ngx-core-ui/projects/core-ui-lib/src/lib/core-ui-lib.module";

@NgModule({
  declarations: [OnboardingComponent],
  imports: [CommonModule, SharedModule, OnboardingRoutingModule, LoginModule, FormsModule, CoreUiLibModule],
  bootstrap: [OnboardingComponent],
})
export class OnboardingModule {}
