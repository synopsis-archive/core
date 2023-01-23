import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailInputComponent} from "./email-input/email-input.component";
import {PasswordInputComponent} from "./password-input/password-input.component";
import {FormsModule} from "@angular/forms";
import {UsernameInputComponent} from "./username-input/username-input.component";

@NgModule({
  declarations: [
    EmailInputComponent,
    PasswordInputComponent,
    UsernameInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    EmailInputComponent,
    PasswordInputComponent,
    UsernameInputComponent
  ],

})
export class SharedModule { }
