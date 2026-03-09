import { type Route } from "@angular/router";

import { Error404Component } from "@vapour/components/error/error404.component";
import {
  movieSetsResolver,
  moviesResolver,
  recentlyAddedMoviesResolver,
} from "@vapour/resolvers/movies.resolvers";

export const routes: Route[] = [
  {
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
        path: "sets",
        loadComponent: () =>
          import("./grid/grid.component").then((x) => x.GridComponent),
        resolve: {
          grid: movieSetsResolver,
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
