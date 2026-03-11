import { type Route } from "@angular/router";

import { Error404Component } from "@vapour/components/error/error404.component";
import {
  movieGenresResolver,
  moviesByGenreResolver,
  moviesBySetResolver,
  movieSetsResolver,
  moviesResolver,
  recentlyAddedMoviesResolver,
} from "@vapour/resolvers/movies.resolvers";
import {
  albumsByArtistResolver,
  albumsResolver,
  artistsByGenreResolver,
  artistsResolver,
  musicGenresResolver,
  recentlyAddedAlbumsResolver,
} from "@vapour/resolvers/music.resolvers";
import {
  getTvShowSeasonsResolver,
  getTvShowsInProgressResolver,
  getTvShowsResolver,
} from "@vapour/resolvers/tv.resolvers";

import { socketGuard } from "./guards/socket.guard";

export const routes: Route[] = [
  {
    canActivate: [socketGuard],
    canActivateChild: [socketGuard],
    path: "movies",
    loadComponent: () =>
      import("./movies/movies.component").then((x) => x.MoviesComponent),
    children: [
      {
        path: "recent",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: recentlyAddedMoviesResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "titles",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: moviesResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "sets/:movieSetId",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: moviesBySetResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "sets",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: movieSetsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: moviesByGenreResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: movieGenresResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: ":movieId",
        loadComponent: () =>
          import("./movies/movie.component").then((x) => x.MovieComponent),
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "recent",
      },
    ],
  },
  {
    canActivate: [socketGuard],
    canActivateChild: [socketGuard],
    path: "music",
    loadComponent: () =>
      import("./music/music.component").then((x) => x.MusicComponent),
    children: [
      {
        path: "recent",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: recentlyAddedAlbumsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "albums/:albumId",
        loadComponent: () =>
          import("./music/album.component").then((x) => x.AlbumComponent),
      },
      {
        path: "albums",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: albumsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "artists/:artistId",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: albumsByArtistResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "artists",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: artistsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "genres/:genre",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: artistsByGenreResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "genres",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: musicGenresResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "recent",
      },
    ],
  },
  {
    canActivate: [socketGuard],
    canActivateChild: [socketGuard],
    path: "tv",
    loadComponent: () => import("./tv/tv.component").then((x) => x.TvComponent),
    children: [
      {
        path: "recent",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: getTvShowsInProgressResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "titles",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: getTvShowsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: ":tvShowId",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: getTvShowSeasonsResolver,
        },
        runGuardsAndResolvers: "paramsOrQueryParamsChange",
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "recent",
      },
    ],
  },
  {
    canActivate: [socketGuard],
    path: "settings",
    loadComponent: () =>
      import("./settings/settings.component").then((x) => x.SettingsComponent),
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
