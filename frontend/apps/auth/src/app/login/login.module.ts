import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginRoutingModule } from "./login-routing.module";
import { CredentialPageComponent } from "./credential-page/credential-page.component";
import { DailyQuoteComponent } from "./daily-quote/daily-quote.component";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [CredentialPageComponent, DailyQuoteComponent, LoginComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
