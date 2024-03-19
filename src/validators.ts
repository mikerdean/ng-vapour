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

export const albumValidator = object({
  albumId: positiveInteger,
  page: minimumOneInteger,
});

export const artistValidator = object({
  artistId: positiveInteger,
  page: minimumOneInteger,
});

export const genreValidator = object({
  genre: string([minLength(1)]),
  page: minimumOneInteger,
});

export const movieValidator = object({
  movieId: positiveInteger,
  page: minimumOneInteger,
});

export const movieSetValidator = object({
  page: minimumOneInteger,
  setId: positiveInteger,
});

export const tvShowValidator = object({
  page: minimumOneInteger,
  tvShowId: positiveInteger,
});

export const seasonValidator = object({
  page: minimumOneInteger,
  seasonId: positiveInteger,
});

export const episodeValidator = object({
  episodeId: positiveInteger,
  page: minimumOneInteger,
});

export const pageValidator = object({
  page: minimumOneInteger,
});
