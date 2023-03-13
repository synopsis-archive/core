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
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconAffiliate,
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
  IconLogout,
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconAffiliate,
};

@NgModule({
  declarations: [],
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
