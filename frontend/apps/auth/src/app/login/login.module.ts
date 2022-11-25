import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { CredentialPageComponent } from "./credential-page/credential-page.component";
import { DailyQuoteComponent } from "./daily-quote/daily-quote.component";


@NgModule({
  declarations: [CredentialPageComponent, DailyQuoteComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
