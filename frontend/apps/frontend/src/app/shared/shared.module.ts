import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { TabComponent } from "./nav-bar/tab/tab.component";
import { IconsModule } from "../icons/icons.module";

@NgModule({
  declarations: [NavBarComponent, TabComponent],
  imports: [CommonModule, IconsModule],
  exports: [NavBarComponent],
})
export class SharedModule {}
