import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {TabComponent} from "./nav-bar/tab/tab.component";
import {IconsModule} from "../icons/icons.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    NavBarComponent,
    TabComponent,
  ],
  exports: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    RouterLink
  ]
})
export class SharedModule {
}
