import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CredentialPageComponent} from "./credential-page/credential-page.component";

const routes: Routes = [
  {path: "credentials", component: CredentialPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
