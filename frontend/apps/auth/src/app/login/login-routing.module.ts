import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CredentialPageComponent } from "./credential-page/credential-page.component";
import { LoginComponent } from "./login.component";

const routes: Routes = [{ path: "login", component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
