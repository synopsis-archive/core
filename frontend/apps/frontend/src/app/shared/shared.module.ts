import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { TabComponent } from "./nav-bar/tab/tab.component";

@NgModule({
  declarations: [NavBarComponent, TabComponent],
  imports: [CommonModule],
  exports: [NavBarComponent],
})
export class SharedModule {}
