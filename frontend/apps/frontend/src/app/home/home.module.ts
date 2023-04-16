import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeComponent} from "./home/home.component";
import {CategoryComponent} from "./category/category.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ListViewComponent} from "./list-view/list-view.component";
import {ListViewItemComponent} from "./list-view-item/list-view-item.component";
import {CoreUiModule} from "core-ui";
import {MainframeConnectorModule} from "mainframe-connector";
import {SharedModule} from "../shared/shared.module";
import {IconsModule} from "../icons/icons.module";
import {
  IconAffiliate,
  IconBrandGithub,
  IconCamera, IconChevronDown, IconChevronUp, IconEyeglass, IconEyeglassOff,
  IconHeart,
  IconLayoutGrid, IconList, IconLogout,
  IconSearch,
  IconSettings, IconStar,
  IconX
} from "angular-tabler-icons/icons";
import {TablerIconsModule} from "angular-tabler-icons";

const icons = {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconX,
  IconSearch,
  IconSettings,
  IconLayoutGrid,
  IconList,
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconAffiliate,
  IconEyeglass,
  IconEyeglassOff,
};

@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    DashboardComponent,
    ListViewComponent,
    ListViewItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainframeConnectorModule,
    SharedModule,
    CoreUiModule,
    IconsModule,
    TablerIconsModule.pick(icons)
  ],
})
export class HomeModule {
}
