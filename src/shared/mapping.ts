import type { GridItem } from "@vapour/components/grid/grid.types";
import { getVideoDuration } from "@vapour/shared/duration";
import type {
  AudioDetailsAlbum,
  AudioDetailsArtist,
  LibraryDetailsGenre,
  VideoDetailsEpisode,
  VideoDetailsMovie,
  VideoDetailsMovieSet,
  VideoDetailsTVShow,
} from "@vapour/shared/kodi";

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

export const mapGenreToGridItem = (
  genre: LibraryDetailsGenre,
  type: string,
): GridItem => ({
  id: genre.genreid,
  details: [],
  label: genre.label,
  url: `/${type}/genres/${genre.label}`,
});

export const mapAlbumToGridItem = (album: AudioDetailsAlbum): GridItem => ({
  id: album.albumid,
  details: [album.artist?.join(", "), album.year],
  label: album.label,
  thumbnail: album.art?.thumb,
  url: `/music/albums/${album.albumid}`,
});

export const mapArtistToGridItem = (artist: AudioDetailsArtist): GridItem => ({
  id: artist.artistid,
  details: [artist.songgenres?.map(({ title }) => title).join(", ")],
  label: artist.label,
  thumbnail: artist.art?.thumb,
  url: `/music/artists/${artist.artistid}`,
});

export const mapEpisodeToGridItem = (
  episode: VideoDetailsEpisode,
): GridItem => ({
  id: episode.episodeid,
  details: [episode.showtitle, episode.season],
  label: episode.label,
  thumbnail: episode.art?.thumb,
  url: `/tv/episodes/${episode.episodeid}`,
});

export const mapTvShowToGridItem = (tvshow: VideoDetailsTVShow): GridItem => ({
  id: tvshow.tvshowid,
  details: [tvshow.watchedepisodes || 0, tvshow.year],
  label: tvshow.label,
  thumbnail: tvshow.art?.poster,
  url: `tv/${tvshow.tvshowid}`,
});
