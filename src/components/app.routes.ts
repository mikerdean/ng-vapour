import { type Route } from "@angular/router";

import { Error404Component } from "@vapour/components/error/error404.component";

export const routes: Route[] = [
  {
    path: "grid/:type/:action",
    loadComponent: () =>
      import("./grid/grid.component").then((x) => x.GridComponent),
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((x) => x.SettingsComponent),
  },
  {
    path: "",
    redirectTo: "/grid/movies/recent",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
