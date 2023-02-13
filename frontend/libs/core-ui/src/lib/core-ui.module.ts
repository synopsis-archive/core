import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SynoButtonComponent} from "./syno-button/syno-button.component";
import {SynoEmailComponent} from "./syno-email/syno-email.component";
import {SynoPasswordComponent} from "./syno-password/syno-password.component";
import {FormsModule} from "@angular/forms";
import {SynoUsernameComponent} from "./syno-username/syno-username.component";
import {TablerIconsModule} from "angular-tabler-icons";
import {IconEyeglass, IconEyeglassOff} from "angular-tabler-icons/icons";
import {SynoIconButtonComponent} from "./syno-icon-button/syno-icon-button.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TablerIconsModule.pick({
      IconEyeglass,
      IconEyeglassOff,
    }),
  ],
  declarations: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
    SynoIconButtonComponent,
  ],
  exports: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
    SynoIconButtonComponent,
  ],
})
export class CoreUiModule {
}
