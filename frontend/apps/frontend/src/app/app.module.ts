import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { MainframeConnectorModule } from "mainframe-connector";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { PluginComponent } from "./plugin/plugin.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MainframeConnectorModule,
    HomeModule,
    AppRoutingModule,
    SharedModule,
  ],
})
export class AppModule {}
