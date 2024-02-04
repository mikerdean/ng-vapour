import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { RouteWithMetadata } from "./app.routes.types";
import { InstalledAddonsComponent } from "./views/addons/installed-addons.component";
import { RecentMoviesComponent } from "./views/movies/recent-movies.component";
import { RecentMusicComponent } from "./views/music/recent-music.component";
import { SettingsComponent } from "./views/settings/settings.component";
import { RecentTvComponent } from "./views/tv/recent-tv.component";

export const routes: RouteWithMetadata[] = [
  {
    path: "",
    redirectTo: "/movies",
    pathMatch: "full",
  },
  {
    path: "movies",
    component: RecentMoviesComponent,
    icon: faFilm,
    title: "Movies",
  },
  {
    path: "music",
    component: RecentMusicComponent,
    icon: faMusic,
    title: "Music",
  },
  { path: "tv", component: RecentTvComponent, icon: faDisplay, title: "TV" },
  {
    path: "addons",
    component: InstalledAddonsComponent,
    icon: faCubes,
    title: "Addons",
  },
  {
    path: "settings",
    component: SettingsComponent,
    icon: faCog,
    title: "Settings",
  },
];
