import {
  coerce,
  fallback,
  integer,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

const positiveInteger = coerce(number([integer(), minValue(1)]), Number);

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
  genre: string([minLength(1)]),
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
  tvShowId: minimumOneInteger,
  season: minimumOneInteger,
});

export const episodeValidator = object({
  episodeId: positiveInteger,
});

export const pageValidator = object({
  page: minimumOneInteger,
});
