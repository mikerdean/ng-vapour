import {
  assertInInjectionContext,
  computed,
  inject,
  Injector,
  runInInjectionContext,
} from "@angular/core";
import { Router, type ActivatedRouteSnapshot } from "@angular/router";
import { parse } from "valibot";

import type {
  GridData,
  GridItem,
} from "@vapour/components/grid/grid.component";
import { LibraryDetailsGenre } from "@vapour/schema/library";
import { VideoDetailsMovie, VideoDetailsMovieSet } from "@vapour/schema/video";
import { MoviesService } from "@vapour/services/movies.service";
import { getVideoDuration } from "@vapour/shared/duration";
import {
  genreValidator,
  movieSetValidator,
  pageValidator,
} from "@vapour/validators";

export async function recentlyAddedMoviesResolver(): Promise<GridData> {
  assertInInjectionContext(recentlyAddedMoviesResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);

  const { limits, movies } = await moviesService.getRecentlyAddedMovies();

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  }));
}

export async function moviesResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, movies } = await moviesService.getMovies(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  }));
}

export async function movieSetsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(movieSetsResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, sets } = await moviesService.getMovieSets(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: sets.map(mapMovieSetToGridItem),
    limits,
    thumbnailType: "movieSet",
  }));
}

export async function movieGenresResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(movieGenresResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, genres } = await moviesService.getMovieGenres(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: genres.map(mapMovieGenreToGridItem),
    limits,
    thumbnailType: "movieGenre",
  }));
}

export async function moviesBySetResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesBySetResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);
  const router = inject(Router);

  const params = parse(movieSetValidator, route.params);

  const { setdetails } = await moviesService.getMovieSetById(params.movieSetId);

  if (setdetails.movies.length === 1) {
    await router.navigate(["/movies", setdetails.movies[0].movieid]);
  }

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: setdetails.movies.map(mapMovieToGridItem),
    limits: {
      start: 0,
      end: setdetails.movies.length,
      total: setdetails.movies.length,
    },
    thumbnailType: "movie",
  }));
}

export async function moviesByGenreResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(moviesByGenreResolver);

  const injector = inject(Injector);
  const moviesService = inject(MoviesService);
  const router = inject(Router);

  const params = parse(genreValidator, route.params);
  const query = parse(pageValidator, route.queryParams);

  const { limits, movies } = await moviesService.getMoviesByGenre(
    params.genre,
    query.page,
  );

  if (movies.length === 1) {
    await router.navigate(["/movies", movies[0].movieid]);
  }

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: movies.map(mapMovieToGridItem),
    limits,
    thumbnailType: "movie",
  }));
}

function mapMovieToGridItem(movie: VideoDetailsMovie): GridItem {
  return {
    id: movie.movieid,
    details: [
      computed(() => movie.year),
      computed(() => getVideoDuration(movie.runtime ?? 0)),
    ],
    label: movie.title ?? movie.label,
    played: (movie.playcount ?? 0) > 0,
    thumbnail: movie.art?.poster ?? movie.thumbnail,
    url: `/movies/${movie.movieid.toString()}`,
  };
}

function mapMovieSetToGridItem(movieset: VideoDetailsMovieSet): GridItem {
  return {
    id: movieset.setid,
    details: [],
    label: movieset.title ?? movieset.label,
    played: (movieset.playcount ?? 0) > 0,
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
