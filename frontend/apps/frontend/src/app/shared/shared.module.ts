import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailInputComponent} from "./email-input/email-input.component";
import {PasswordInputComponent} from "./password-input/password-input.component";
import {DefaultInputComponent} from "./default-input/default-input.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent,
    DefaultInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EmailInputComponent,
    PasswordInputComponent,
    DefaultInputComponent
  ],

})
export class SharedModule { }
