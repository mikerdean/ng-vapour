import type { GridItem } from "../components/grid/grid.types";
import { getVideoDuration } from "./duration";
import type { VideoDetailsMovie, VideoDetailsMovieSet } from "./kodi";

export const mapMovieToGridItem = (movie: VideoDetailsMovie): GridItem => ({
  id: movie.movieid,
  details: [movie.runtime && getVideoDuration(movie.runtime), movie.year],
  label: movie.label,
  played: movie.playcount !== undefined && movie.playcount > 0,
  thumbnail: movie.art?.poster,
  url: `/movies/${movie.movieid}`,
});

export const mapSetToGridItem = (set: VideoDetailsMovieSet): GridItem => ({
  id: set.setid,
  details: [],
  label: set.label,
  played: set.playcount !== undefined && set.playcount > 0,
  thumbnail: set.art?.poster,
  url: `/movies/sets/${set.setid}`,
});
