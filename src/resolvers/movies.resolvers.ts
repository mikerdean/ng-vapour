import { assertInInjectionContext, inject } from "@angular/core";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { parse } from "valibot";

import type {
  GridData,
  GridItem,
} from "@vapour/components/grid/grid.component";
import { LibraryDetailsGenre } from "@vapour/schema/library";
import { VideoDetailsMovie, VideoDetailsMovieSet } from "@vapour/schema/video";
import { MoviesService } from "@vapour/services/movies.service";
import {
  genreValidator,
  movieSetValidator,
  pageValidator,
} from "@vapour/validators";

export async function recentlyAddedMoviesResolver(): Promise<GridData> {
  assertInInjectionContext(recentlyAddedMoviesResolver);

  const moviesService = inject(MoviesService);

  const { limits, movies } = await moviesService.getRecentlyAddedMovies();

  return {
    currentPage: 1,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  };
}

export async function moviesResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesResolver);

  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, movies } = await moviesService.getMovies(query.page);

  return {
    currentPage: query.page,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  };
}

export async function movieSetsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(movieSetsResolver);

  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, sets } = await moviesService.getMovieSets(query.page);

  return {
    currentPage: query.page,
    items: sets.map(mapMovieSetToGridItem),
    limits,
    thumbnailType: "movieSet",
  };
}

export async function movieGenresResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(movieGenresResolver);

  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, genres } = await moviesService.getMovieGenres(query.page);

  return {
    currentPage: query.page,
    items: genres.map(mapMovieGenreToGridItem),
    limits,
    thumbnailType: "movieGenre",
  };
}

export async function moviesBySetResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesBySetResolver);

  const moviesService = inject(MoviesService);
  const params = parse(movieSetValidator, route.params);

  const { setdetails } = await moviesService.getMovieSetById(params.movieSetId);

  return {
    currentPage: 1,
    items: setdetails.movies.map(mapMovieToGridItem),
    limits: {
      start: 0,
      end: setdetails.movies.length,
      total: setdetails.movies.length,
    },
    thumbnailType: "movie",
  };
}

export async function moviesByGenreResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesByGenreResolver);

  const moviesService = inject(MoviesService);
  const params = parse(genreValidator, route.params);
  const query = parse(pageValidator, route.queryParams);

  const { limits, movies } = await moviesService.getMoviesByGenre(
    params.genre,
    query.page,
  );

  return {
    currentPage: query.page,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  };
}

function mapMovieToGridItem(movie: VideoDetailsMovie): GridItem {
  return {
    id: movie.movieid,
    details: [],
    label: movie.title ?? movie.label,
    thumbnail: movie.art?.poster ?? movie.thumbnail,
    url: `/movies/${movie.movieid.toString()}`,
  };
}

function mapMovieSetToGridItem(movieset: VideoDetailsMovieSet): GridItem {
  return {
    id: movieset.setid,
    details: [],
    label: movieset.title ?? movieset.label,
    thumbnail: movieset.art?.poster ?? movieset.thumbnail,
    url: `/movies/sets/${movieset.setid.toString()}`,
  };
}

function mapMovieGenreToGridItem(genre: LibraryDetailsGenre): GridItem {
  return {
    id: genre.genreid,
    details: [],
    label: genre.title ?? genre.label,
    url: `/movies/genres/${genre.label}`,
  };
}
