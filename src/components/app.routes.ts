import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { RouteWithMetadata } from "./app.routes.types";
import { Error404Component } from "./views/error/error404.component";

export const routes: RouteWithMetadata[] = [
  {
    path: "movies",
    loadComponent: () =>
      import("./views/movies/movies.component").then((x) => x.MoviesComponent),
    icon: faFilm,
    title: "Movies",
    children: [
      {
        path: "",
        loadComponent: () =>
          import("./views/movies/recent-movies.component").then(
            (x) => x.RecentMoviesComponent,
          ),
        title: "Recent Movies",
      },
    ],
  },
  {
    path: "music",
    loadComponent: () =>
      import("./views/music/recent-music.component").then(
        (x) => x.RecentMusicComponent,
      ),
    icon: faMusic,
    title: "Music",
  },
  {
    path: "tv",
    loadComponent: () =>
      import("./views/tv/recent-tv.component").then((x) => x.RecentTvComponent),
    icon: faDisplay,
    title: "TV",
  },
  {
    path: "addons",
    loadComponent: () =>
      import("./views/addons/installed-addons.component").then(
        (x) => x.InstalledAddonsComponent,
      ),
    icon: faCubes,
    title: "Addons",
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./views/settings/settings.component").then(
        (x) => x.SettingsComponent,
      ),
    icon: faCog,
    title: "Settings",
  },
  {
    path: "",
    redirectTo: "/movies",
    pathMatch: "full",
  },
  {
    path: "**",
    component: Error404Component,
  },
];
