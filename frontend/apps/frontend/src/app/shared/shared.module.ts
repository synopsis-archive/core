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
import {SearchResultComponent} from "./search-result/search-result.component";
import {GridPluginComponent} from "./grid-plugin/grid-plugin.component";
import {CoreUiLibModule} from "@htl-grieskirchen-core/ngx-core-ui/projects/core-ui-lib/src/lib/core-ui-lib.module";

@NgModule({
  declarations: [
    NavBarComponent,
    TabComponent,
    SynoNavTabComponent,
    FooterComponent,
    SearchComponent,
    SearchResultComponent,
    GridPluginComponent,
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SearchComponent,
    GridPluginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    RouterLink,
    FormsModule,
    CoreUiLibModule,
  ],
})
export class SharedModule {
}
