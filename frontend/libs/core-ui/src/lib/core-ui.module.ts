import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SynoButtonComponent} from "./syno-button/syno-button.component";
import {SynoBaseComponent} from "./syno-base/syno-base.component";
import {SynoEmailComponent} from "./syno-email/syno-email.component";
import {SynoPasswordComponent} from "./syno-password/syno-password.component";
import {FormsModule} from "@angular/forms";
import {SynoUsernameComponent} from "./syno-username/syno-username.component";

@NgModule({
  imports: [CommonModule, FormsModule,],
  declarations: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
  ],
  exports: [
    SynoButtonComponent,
    SynoEmailComponent,
    SynoPasswordComponent,
    SynoUsernameComponent,
  ],
})
export class CoreUiModule {
}
