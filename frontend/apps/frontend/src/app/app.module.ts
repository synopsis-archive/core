import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MainframeConnectorModule } from "mainframe-connector";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainframeConnectorModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
