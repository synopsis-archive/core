import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { TabComponent } from "./nav-bar/tab/tab.component";
import { IconsModule } from "../icons/icons.module";
import { TagComponent } from "./tag/tag.component";

@NgModule({
  declarations: [NavBarComponent, TabComponent, TagComponent],
  imports: [CommonModule, IconsModule],
  exports: [NavBarComponent, TagComponent],
})
export class SharedModule {}
