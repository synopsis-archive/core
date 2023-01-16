import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {MainframeConnectorModule} from "mainframe-connector";
import {SharedModule} from "./shared/shared.module";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import {SettingsModule} from "./settings/settings.module";

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MainframeConnectorModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    SharedModule,
    SettingsModule
  ],
})
export class AppModule {}
