import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SynoButtonComponent} from "./syno-button/syno-button.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SynoButtonComponent],
  exports: [
    SynoButtonComponent
  ]
})
export class CoreUiModule {}
