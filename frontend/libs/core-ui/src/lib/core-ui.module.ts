import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SynoButtonComponent} from "./syno-button/syno-button.component";
import {SynoBaseComponent} from "./syno-base/syno-base.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SynoButtonComponent, SynoBaseComponent],
  exports: [SynoButtonComponent],
})
export class CoreUiModule {
}
