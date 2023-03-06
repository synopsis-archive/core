import {NgModule} from "@angular/core";
import {TablerIconsModule} from "angular-tabler-icons";

import {
  IconBrandGithub,
  IconCamera,
  IconChevronDown,
  IconChevronUp,
  IconEyeglass,
  IconEyeglassOff,
  IconHeart,
  IconLayoutGrid,
  IconList,
  IconLogout,
  IconSearch,
  IconSettings,
  IconX,
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
  IconEyeglass,
  IconEyeglassOff,
};

@NgModule({
  declarations: [],
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
