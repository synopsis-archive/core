import { Route } from "@angular/router";
import {CredentialPageComponent} from "./login/credential-page/credential-page.component";

export const appRoutes: Route[] = [
  {path: "credentials", component: CredentialPageComponent}
];
