import type { GridItem } from "../components/grid/grid.types";
import { getVideoDuration } from "./duration";
import type { VideoDetailsMovie } from "./kodi";

export const mapMovieToGridItem = (movie: VideoDetailsMovie): GridItem => ({
  id: movie.movieid,
  details: [movie.runtime && getVideoDuration(movie.runtime), movie.year],
  label: movie.label,
  played: movie.playcount !== undefined && movie.playcount > 0,
  thumbnail: movie.art?.poster,
  url: `/movies/${movie.movieid}`,
});
