import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { TabComponent } from "./nav-bar/tab/tab.component";
import { IconsModule } from "../icons/icons.module";
import { TagComponent } from "./tag/tag.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [NavBarComponent, TabComponent, TagComponent],
    imports: [CommonModule, IconsModule, RouterLink],
  exports: [NavBarComponent, TagComponent],
})
export class SharedModule {}
