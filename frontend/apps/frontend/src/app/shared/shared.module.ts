import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {TabComponent} from "./nav-bar/tab/tab.component";
import {IconsModule} from "../icons/icons.module";
import {RouterLink} from "@angular/router";
import {SynoNavTabComponent} from "./syno-nav-tab/syno-nav-tab.component";
import {FooterComponent} from "./footer/footer.component";
import {SearchComponent} from "./search/search.component";
import {CoreUiModule} from "core-ui";

@NgModule({
  declarations: [
    NavBarComponent,
    TabComponent,
    SynoNavTabComponent,
    FooterComponent,
    SearchComponent,
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    RouterLink,
    CoreUiModule,
  ],
})
export class SharedModule {
}
