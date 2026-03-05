import { type Route } from "@angular/router";

import { Error404Component } from "@vapour/components/error/error404.component";

export const routes: Route[] = [
  {
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((x) => x.SettingsComponent),
  },
  {
    path: "",
    redirectTo: "/settings",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
