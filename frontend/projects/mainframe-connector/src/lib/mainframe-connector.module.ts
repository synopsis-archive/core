import {NgModule} from "@angular/core";
import {PluginPlaceholderComponent} from "./plugin-placeholder/plugin-placeholder.component";
import {AngularResizeEventModule} from "angular-resize-event";


@NgModule({
  declarations: [
    PluginPlaceholderComponent
  ],
  imports: [
    AngularResizeEventModule
  ],
  exports: [
    PluginPlaceholderComponent
  ]
})
export class MainframeConnectorModule {
}
