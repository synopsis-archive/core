import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MainframeConnectorModule } from "mainframe-connector";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import {SettingsModule} from "./settings/settings.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainframeConnectorModule,
    HomeModule,
    AppRoutingModule,
    SettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
