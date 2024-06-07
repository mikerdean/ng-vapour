import {
  any,
  fallback,
  integer,
  minLength,
  minValue,
  object,
  pipe,
  string,
  transform
} from "valibot";

const positiveInteger = pipe(any(), transform((x) => Number.parseInt(x, 10)), integer(), minValue(1));

const minimumOneInteger = fallback(positiveInteger, 1);

export const emptyParamsValidator = object({});

export const albumValidator = object({
  albumId: positiveInteger,
  page: minimumOneInteger,
});

export const artistValidator = object({
  artistId: positiveInteger,
});

export const genreValidator = object({
  genre: pipe(string(), minLength(1)),
});

export const movieValidator = object({
  movieId: positiveInteger,
});

export const movieSetValidator = object({
  movieSetId: minimumOneInteger,
});

export const tvShowValidator = object({
  tvShowId: minimumOneInteger,
});

export const seasonValidator = object({
  seasonId: minimumOneInteger,
});

export const episodeValidator = object({
  episodeId: positiveInteger,
});

export const pageValidator = object({
  page: minimumOneInteger,
});
