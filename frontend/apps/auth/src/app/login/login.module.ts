import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { DailyQuoteComponent } from "./daily-quote/daily-quote.component";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DailyQuoteComponent, LoginComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule],
  bootstrap: [LoginComponent],
})
export class LoginModule {}
