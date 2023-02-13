import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TablerIconsModule } from "angular-tabler-icons";

import {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconX,
  IconSearch,
  IconSettings,
  IconLayoutGrid,
  IconList,
  IconChevronDown,
  IconLogout,
} from "angular-tabler-icons/icons";

const icons = {
  IconCamera,
  IconHeart,
  IconBrandGithub,
  IconX,
  IconSearch,
  IconSettings,
  IconLayoutGrid,
  IconList,
  IconChevronDown,
  IconLogout,
};

@NgModule({
  declarations: [],
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
