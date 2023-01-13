import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PluginComponent } from "./plugin/plugin.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "plugin",
    loadChildren: () =>
      import("./plugin/plugin.module").then((m) => m.PluginModule),
  },
  {
    path: "credits",
    loadChildren: () =>
      import("./credits/credits.module").then((m) => m.CreditsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
