import { type Route } from "@angular/router";

import { Error404Component } from "@vapour/components/views/error/error404.component";

export const routes: Route[] = [
  {
    path: "movies",
    loadComponent: () =>
      import("./views/movies/movies.component").then((x) => x.MoviesComponent),
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
      },
      {
        path: "titles",
        loadComponent: () =>
          import("./views/movies/movies-by-title.component").then(
            (x) => x.MoviesByTitleComponent,
          ),
      },
      {
        path: "sets",
        loadComponent: () =>
          import("./views/movies/movie-sets.component").then(
            (x) => x.MovieSetsComponent,
          ),
      },
      {
        path: "sets/:movieSetId",
        loadComponent: () =>
          import("./views/movies/movie-set.component").then(
            (x) => x.MovieSetComponent,
          ),
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./views/movies/movie-genres.component").then(
            (x) => x.MovieGenresComponent,
          ),
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./views/movies/movie-genre.component").then(
            (x) => x.MovieGenreComponent,
          ),
      },
    ],
  },
  {
    path: "music",
    loadComponent: () =>
      import("./views/music/music.component").then((x) => x.MusicComponent),
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
      },
      {
        path: "artists",
        loadComponent: () =>
          import("./views/music/artists.component").then(
            (x) => x.ArtistsComponent,
          ),
      },
      {
        path: "artists/:artistId",
        loadComponent: () =>
          import("./views/music/artist.component").then(
            (x) => x.ArtistComponent,
          ),
      },
      {
        path: "albums",
        loadComponent: () =>
          import("./views/music/albums.component").then(
            (x) => x.AlbumsComponent,
          ),
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./views/music/music-genres.component").then(
            (x) => x.MusicGenresComponent,
          ),
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./views/music/music-genre.component").then(
            (x) => x.MusicGenreComponent,
          ),
      },
    ],
  },
  {
    path: "tv",
    loadComponent: () =>
      import("./views/tv/tv.component").then((x) => x.TvComponent),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "/tv/in-progress",
      },
      {
        path: "in-progress",
        loadComponent: () =>
          import("./views/tv/tv-in-progress.component").then(
            (x) => x.TvInProgressComponent,
          ),
      },
      {
        path: "recent",
        loadComponent: () =>
          import("./views/tv/tv-recent.component").then(
            (x) => x.TvRecentComponent,
          ),
      },
      {
        path: "titles",
        loadComponent: () =>
          import("./views/tv/tv-by-title.component").then(
            (x) => x.TvByTitleComponent,
          ),
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./views/tv/tv-genres.component").then(
            (x) => x.TvGenresComponent,
          ),
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./views/tv/tv-genre.component").then(
            (x) => x.TvGenreComponent,
          ),
      },
    ],
  },
  {
    path: "addons",
    loadComponent: () =>
      import("./views/addons/installed-addons.component").then(
        (x) => x.InstalledAddonsComponent,
      ),
    title: "routes:addons.root",
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./views/settings/settings.component").then(
        (x) => x.SettingsComponent,
      ),
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
