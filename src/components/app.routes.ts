import type { Routes } from "@angular/router";

import { InstalledAddonsComponent } from "./views/addons/installed-addons.component";
import { RecentMoviesComponent } from "./views/movies/recent-movies.component";
import { RecentMusicComponent } from "./views/music/recent-music.component";
import { SettingsComponent } from "./views/settings/settings.component";
import { RecentTvComponent } from "./views/tv/recent-tv.component";

export const routes: Routes = [
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  { path: "movies", component: RecentMoviesComponent },
  { path: "music", component: RecentMusicComponent },
  { path: "tv", component: RecentTvComponent },
  { path: "addons", component: InstalledAddonsComponent },
  { path: "settings", component: SettingsComponent },
];
