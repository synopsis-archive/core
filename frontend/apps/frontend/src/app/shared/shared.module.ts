import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { TabComponent } from "./nav-bar/tab/tab.component";
import { IconsModule } from "../icons/icons.module";
import { TagComponent } from "./tag/tag.component";
import { RouterLink } from "@angular/router";
import { SynoNavTabComponent } from "./syno-nav-tab/syno-nav-tab.component";
import { FooterComponent } from "./footer/footer.component";
import { SynoBtnComponent } from "./syno-btn/syno-btn.component";
import { SectionHeaderComponent } from "./section-header/section-header.component";

@NgModule({
  declarations: [
    NavBarComponent,
    TabComponent,
    TagComponent,
    SynoNavTabComponent,
    FooterComponent,
    SynoBtnComponent,
    SectionHeaderComponent,
  ],
  exports: [
    NavBarComponent,
    TagComponent,
    FooterComponent,
    SynoBtnComponent,
    SectionHeaderComponent,
  ],
  imports: [CommonModule, FormsModule, IconsModule, RouterLink],
})
export class SharedModule {}
