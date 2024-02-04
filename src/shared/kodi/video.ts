import type { MediaArtwork, MediaDetailsBase, Properties } from "./base";
import type { LibraryDetailsGenre } from "./library";
import type {
  KodiMessageFilter,
  KodiMessageLimits,
  KodiMessageLimitsReturned,
  KodiMessageSort,
} from "./message";

export type VideoDetailsBase = MediaDetailsBase & {
  art?: MediaArtwork;
  playcount?: number;
};

export type VideoDetailsMedia = VideoDetailsBase & {
  title?: string;
};

export type VideoDetailsItem = VideoDetailsMedia & {
  dateadded?: string;
  file?: string;
  lastplayed?: string;
  plot?: string;
};

export type VideoResume = {
  position?: number;
  total?: number;
};

export type VideoStreamsAudio = {
  channels?: number;
  codec?: string;
  language?: string;
};

export type VideoStreamsSubtitle = {
  language?: string;
};

export type VideoStreamsVideo = {
  aspect?: number;
  codec?: string;
  duration?: number;
  height?: number;
  width?: number;
};

export type VideoStreams = {
  audio?: VideoStreamsAudio[];
  subtitle?: VideoStreamsSubtitle[];
  video?: VideoStreamsVideo[];
};

export type VideoDetailsFile = VideoDetailsItem & {
  director?: string[];
  resume?: VideoResume;
  runtime?: number;
  streamdetails?: VideoStreams;
};

export type VideoDetailsCast = {
  name: string;
  order: number;
  role: string;
  thumbnail?: string;
};

export type VideoDetailsMovie = VideoDetailsFile & {
  cast?: VideoDetailsCast[];
  country?: string[];
  genre?: string[];
  imdbnumber?: string;
  movieid: number;
  mpaa?: string;
  originaltitle?: string;
  plotoutline?: string;
  premiered?: string;
  rating?: number;
  set?: string;
  setid?: number;
  showlink?: string[];
  sorttitle?: string;
  studio?: string[];
  tag?: string[];
  tagline?: string;
  top250?: number;
  trailer?: string;
  uniqueid?: number;
  userrating?: number;
  votes?: string;
  writer?: string[];
  year?: number;
};

export type VideoDetailsMovieSet = VideoDetailsMedia & {
  plot?: string;
  setid: number;
};

export type VideoDetailsTVShow = VideoDetailsItem & {
  cast?: VideoDetailsCast[];
  episode?: number;
  episodeguide?: string;
  genre?: string[];
  imdbnumber?: string;
  mpaa?: string;
  originaltitle?: string;
  premiered?: string;
  rating?: number;
  runtime?: number;
  season?: number;
  sorttitle?: string;
  status?: string;
  studio?: string[];
  tag?: string[];
  tvshowid: number;
  uniqueid?: number;
  userrating?: number;
  votes?: number;
  watchedepisodes?: number;
  year?: number;
};

export type VideoDetailsSeason = VideoDetailsBase & {
  episode?: number;
  season: number;
  seasonid: number;
  showtitle?: string;
  title?: string;
  tvshowid: number;
  userrating?: number;
  watchedepisodes: number;
};

export type VideoDetailsEpisode = VideoDetailsFile & {
  cast?: VideoDetailsCast[];
  episode: number;
  episodeid: number;
  firstaired?: string;
  originaltitle?: string;
  productioncode?: string;
  rating?: number;
  season?: number;
  seasonid: number;
  showtitle?: string;
  specialsortepisode?: number;
  specialsortseason?: number;
  tvshowid: number;
  userrating?: number;
  votes?: string;
  writer?: string[];
};

export type GetMoviesQuery = Properties<VideoDetailsMovie> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMovieQuery = Properties<VideoDetailsMovie> & {
  movieid: number;
};

export type GetMovie = {
  moviedetails: VideoDetailsMovie;
};

export type GetMovies = {
  limits: KodiMessageLimitsReturned;
  movies: VideoDetailsMovie[];
};

export type GetMovieSetsQuery = Properties<VideoDetailsMovieSet> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMovieSets = {
  limits: KodiMessageLimitsReturned;
  sets: VideoDetailsMovieSet[];
};

export type GetMovieSetDetailsQuery = Properties<VideoDetailsMovieSet> & {
  limits?: KodiMessageLimits;
  movies: Properties<VideoDetailsMovie> & {
    sort?: KodiMessageSort;
  };
  setid: number;
};

export type GetMovieSet = {
  limits: KodiMessageLimitsReturned;
  setdetails: VideoDetailsMovieSet & {
    movies: VideoDetailsMovie[];
  };
};

export type GetVideoGenresQuery = Properties<LibraryDetailsGenre> & {
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
  type: "movie" | "tvshow" | "musicvideo";
};

export type VideoGenresPaged = {
  genres: LibraryDetailsGenre[];
  limits: KodiMessageLimitsReturned;
};

export type GetTVShowsQuery = Properties<VideoDetailsTVShow> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
};

export type GetTVShows = {
  limits: KodiMessageLimitsReturned;
  tvshows: VideoDetailsTVShow[];
};

export type GetSeasonsQuery = Properties<VideoDetailsSeason> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
  tvshowid: number;
};

export type GetSeasons = {
  limits: KodiMessageLimitsReturned;
  seasons: VideoDetailsSeason[];
};

export type GetTVShowDetailsQuery = Properties<VideoDetailsTVShow> & {
  tvshowid: number;
};

export type GetTVShow = {
  tvshowdetails: VideoDetailsTVShow;
};

export type GetSeasonDetailsQuery = Properties<VideoDetailsSeason> & {
  seasonid: number;
};

export type GetSeason = {
  seasondetails: VideoDetailsSeason;
};

export type GetEpisodesQuery = Properties<VideoDetailsEpisode> & {
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
  season: number;
  tvshowid: number;
};

export type GetEpisodes = {
  episodes: VideoDetailsEpisode[];
  limits: KodiMessageLimitsReturned;
};

export type GetRecentEpisodesQuery = Properties<VideoDetailsEpisode> & {
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
};

export type GetEpisodeQuery = Properties<VideoDetailsEpisode> & {
  episodeid: number;
};

export type GetEpisode = {
  episodedetails: VideoDetailsEpisode;
};
