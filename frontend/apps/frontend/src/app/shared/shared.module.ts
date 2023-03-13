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
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [
    NavBarComponent,
    TabComponent,
    TagComponent,
    SynoNavTabComponent,
    FooterComponent,
    SynoBtnComponent,
    SearchComponent,
  ],
  exports: [NavBarComponent, TagComponent, FooterComponent, SearchComponent],
  imports: [CommonModule, FormsModule, IconsModule, RouterLink, FormsModule],
})
export class SharedModule {}
