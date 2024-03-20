import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { RouteWithMetadata } from "@vapour/components/app.routes.types";
import { Error404Component } from "@vapour/components/views/error/error404.component";

export const routes: RouteWithMetadata[] = [
  {
    path: "movies",
    loadComponent: () =>
      import("./views/movies/movies.component").then((x) => x.MoviesComponent),
    icon: faFilm,
    title: "routes:movies.root",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/movies/recent",
      },
      {
        path: "recent",
        loadComponent: () =>
          import("./views/movies/recent-movies.component").then(
            (x) => x.RecentMoviesComponent,
          ),
        title: "routes:movies.recent",
      },
      {
        path: "titles",
        loadComponent: () =>
          import("./views/movies/movies-by-title.component").then(
            (x) => x.MoviesByTitleComponent,
          ),
        title: "routes:movies.titles",
      },
      {
        path: "sets",
        loadComponent: () =>
          import("./views/movies/movie-sets.component").then(
            (x) => x.MovieSetsComponent,
          ),
        title: "routes:movies.sets",
      },
      {
        path: "sets/:movieSetId",
        loadComponent: () =>
          import("./views/movies/movie-set.component").then(
            (x) => x.MovieSetComponent,
          ),
        title: "routes:movies.set",
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./views/movies/movie-genres.component").then(
            (x) => x.MovieGenresComponent,
          ),
        title: "routes:movies.genres",
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./views/movies/movie-genre.component").then(
            (x) => x.MovieGenreComponent,
          ),
        title: "routes:movies.genre",
      },
    ],
  },
  {
    path: "music",
    loadComponent: () =>
      import("./views/music/music.component").then((x) => x.MusicComponent),
    icon: faMusic,
    title: "routes:music.root",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/music/recent",
      },
      {
        path: "recent",
        loadComponent: () =>
          import("./views/music/recent-albums.component").then(
            (x) => x.RecentAlbumsComponent,
          ),
        title: "routes:music.recent",
      },
      {
        path: "artists",
        loadComponent: () =>
          import("./views/music/artists.component").then(
            (x) => x.ArtistsComponent,
          ),
        title: "routes:music.artists",
      },
      {
        path: "albums",
        loadComponent: () =>
          import("./views/music/albums.component").then(
            (x) => x.AlbumsComponent,
          ),
        title: "routes:music.albums",
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./views/music/music-genres.component").then(
            (x) => x.MusicGenresComponent,
          ),
        title: "routes:music.genres",
      },
    ],
  },
  {
    path: "tv",
    loadComponent: () =>
      import("./views/tv/recent-tv.component").then((x) => x.RecentTvComponent),
    icon: faDisplay,
    title: "routes:tv.root",
  },
  {
    path: "addons",
    loadComponent: () =>
      import("./views/addons/installed-addons.component").then(
        (x) => x.InstalledAddonsComponent,
      ),
    icon: faCubes,
    title: "routes:addons.root",
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./views/settings/settings.component").then(
        (x) => x.SettingsComponent,
      ),
    icon: faCog,
    title: "routes:settings.root",
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
