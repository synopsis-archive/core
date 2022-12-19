import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailInputComponent} from "./email-input/email-input.component";
import {PasswordInputComponent} from "./password-input/password-input.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EmailInputComponent,
    PasswordInputComponent
  ],

})
export class SharedModule { }
