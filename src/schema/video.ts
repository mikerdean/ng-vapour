import {
  array,
  literal,
  number,
  object,
  optional,
  string,
  union,
  unknown,
  type InferOutput,
} from "valibot";

import {
  kodiFilters,
  kodiLimits,
  kodiLimitsWithTotal,
  kodiSort,
  mediaArtwork,
  mediaDetailsBase,
} from "@vapour/schema/base";
import { libraryDetailsGenre } from "@vapour/schema/library";
import { id, int, properties } from "@vapour/schema/utils";

const videoDetailsBase = object({
  ...mediaDetailsBase.entries,
  art: optional(mediaArtwork),
  playcount: optional(int()),
});

const videoDetailsMedia = object({
  ...videoDetailsBase.entries,
  title: optional(string()),
});

const videoDetailsItem = object({
  ...videoDetailsMedia.entries,
  dateadded: optional(string()),
  file: optional(string()),
  lastplayed: optional(string()),
  plot: optional(string()),
});

const videoResume = object({
  position: optional(int()),
  total: optional(int()),
});

const videoStreamsAudio = object({
  channels: optional(int()),
  codec: optional(string()),
  language: optional(string()),
});

const videoStreamsSubtitle = object({
  language: optional(string()),
});

const videoStreamsVideo = object({
  aspect: optional(number()),
  codec: optional(string()),
  duration: optional(int()),
  height: optional(int()),
  width: optional(int()),
});

const videoStreams = object({
  audio: optional(array(videoStreamsAudio)),
  subtitle: optional(array(videoStreamsSubtitle)),
  video: optional(array(videoStreamsVideo)),
});

const videoDetailsFile = object({
  ...videoDetailsItem.entries,
  director: optional(array(string())),
  resume: optional(videoResume),
  runtime: optional(int()),
  streamdetails: optional(videoStreams),
});

const videoCast = object({
  name: string(),
  order: int(),
  role: string(),
  thumbnail: optional(string()),
});

export type VideoCast = InferOutput<typeof videoCast>;

const videoDetailsMovie = object({
  ...videoDetailsFile.entries,
  cast: optional(array(videoCast)),
  country: optional(array(string())),
  genre: optional(array(string())),
  imdbnumber: optional(string()),
  movieid: id(),
  mpaa: optional(string()),
  originaltitle: optional(string()),
  plotoutline: optional(string()),
  premiered: optional(string()),
  rating: optional(number()),
  ratings: optional(unknown()),
  set: optional(string()),
  setid: optional(id()),
  showlink: optional(array(string())),
  sorttitle: optional(string()),
  studio: optional(array(string())),
  tag: optional(array(string())),
  tagline: optional(string()),
  top250: optional(int()),
  trailer: optional(string()),
  uniqueid: optional(id()),
  userrating: optional(int()),
  votes: optional(string()),
  writer: optional(array(string())),
  year: optional(int()),
});

export type VideoDetailsMovie = InferOutput<typeof videoDetailsMovie>;

const videoDetailsMovieSet = object({
  ...videoDetailsMedia.entries,
  plot: optional(string()),
  setid: id(),
});

export type VideoDetailsMovieSet = InferOutput<typeof videoDetailsMovieSet>;

const videoDetailsTVShow = object({
  ...videoDetailsItem.entries,
  cast: optional(array(videoCast)),
  episode: optional(int()),
  episodeguide: optional(string()),
  genre: optional(array(string())),
  imdbnumber: optional(string()),
  mpaa: optional(string()),
  originaltitle: optional(string()),
  premiered: optional(string()),
  rating: optional(number()),
  ratings: optional(unknown()),
  runtime: optional(int()),
  season: optional(int()),
  sorttitle: optional(string()),
  status: optional(string()),
  studio: optional(array(string())),
  tag: optional(array(string())),
  tvshowid: id(),
  uniqueid: optional(id()),
  userrating: optional(int()),
  votes: optional(string()),
  watchedepisodes: optional(int()),
  year: optional(int()),
});

export type VideoDetailsTVShow = InferOutput<typeof videoDetailsTVShow>;

const videoDetailsSeason = object({
  ...videoDetailsBase.entries,
  episode: optional(int()),
  season: int(),
  seasonid: id(),
  showtitle: optional(string()),
  title: optional(string()),
  tvshowid: optional(id()),
  userrating: optional(int()),
  watchedepisodes: optional(int()),
});

export type VideoDetailsSeason = InferOutput<typeof videoDetailsSeason>;

const videoDetailsEpisode = object({
  ...videoDetailsFile.entries,
  cast: optional(array(videoCast)),
  episode: optional(int()),
  episodeid: id(),
  firstaired: optional(string()),
  originaltitle: optional(string()),
  productioncode: optional(string()),
  rating: optional(number()),
  ratings: optional(unknown()),
  season: optional(int()),
  seasonid: optional(id()),
  showtitle: optional(string()),
  specialsortepisode: optional(int()),
  specialsortseason: optional(int()),
  tvshowid: id(),
  uniqueid: optional(string()),
  userrating: optional(int()),
  votes: optional(string()),
  writer: optional(array(string())),
});

export type VideoDetailsEpisode = InferOutput<typeof videoDetailsEpisode>;

const videoDetailsMovieProperties = properties(videoDetailsMovie, [
  "title",
  "genre",
  "year",
  "rating",
  "director",
  "trailer",
  "tagline",
  "plot",
  "plotoutline",
  "originaltitle",
  "lastplayed",
  "playcount",
  "writer",
  "studio",
  "mpaa",
  "cast",
  "country",
  "imdbnumber",
  "runtime",
  "set",
  "showlink",
  "streamdetails",
  "top250",
  "votes",
  "fanart",
  "thumbnail",
  "file",
  "sorttitle",
  "resume",
  "setid",
  "dateadded",
  "tag",
  "art",
  "userrating",
  "ratings",
  "premiered",
  "uniqueid",
]);

const videoDetailsMovieSetProperties = properties(videoDetailsMovieSet, [
  "title",
  "playcount",
  "fanart",
  "thumbnail",
  "art",
  "plot",
]);

const videoDetailsTVShowProperties = properties(videoDetailsTVShow, [
  "title",
  "genre",
  "year",
  "rating",
  "plot",
  "studio",
  "mpaa",
  "cast",
  "playcount",
  "episode",
  "imdbnumber",
  "premiered",
  "votes",
  "lastplayed",
  "fanart",
  "thumbnail",
  "file",
  "originaltitle",
  "sorttitle",
  "episodeguide",
  "season",
  "watchedepisodes",
  "dateadded",
  "tag",
  "art",
  "userrating",
  "ratings",
  "runtime",
  "uniqueid",
]);

const videoDetailsSeasonProperties = properties(videoDetailsSeason, [
  "season",
  "showtitle",
  "playcount",
  "episode",
  "fanart",
  "thumbnail",
  "tvshowid",
  "watchedepisodes",
  "art",
  "userrating",
  "title",
]);

const videoDetailsEpisodeProperties = properties(videoDetailsEpisode, [
  "title",
  "plot",
  "votes",
  "rating",
  "writer",
  "firstaired",
  "playcount",
  "runtime",
  "director",
  "productioncode",
  "season",
  "episode",
  "originaltitle",
  "showtitle",
  "cast",
  "streamdetails",
  "lastplayed",
  "fanart",
  "thumbnail",
  "file",
  "resume",
  "tvshowid",
  "dateadded",
  "uniqueid",
  "art",
  "specialsortseason",
  "specialsortepisode",
  "userrating",
  "seasonid",
  "ratings",
]);

export const getMoviesRequest = object({
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: videoDetailsMovieProperties,
  sort: optional(kodiSort),
});

export const getMoviesResponse = object({
  limits: kodiLimitsWithTotal,
  movies: array(videoDetailsMovie),
});

export const getMovieDetailsRequest = object({
  movieid: int(),
  properties: videoDetailsMovieProperties,
});

export const getMovieDetailsResponse = object({
  moviedetails: videoDetailsMovie,
});

export const getMovieSetsRequest = object({
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: videoDetailsMovieSetProperties,
  sort: optional(kodiSort),
});

export const getMovieSetsResponse = object({
  limits: kodiLimitsWithTotal,
  sets: array(videoDetailsMovieSet),
});

export const getMovieSetDetailsRequest = object({
  limits: optional(kodiLimits),
  movies: object({
    properties: videoDetailsMovieProperties,
    sort: optional(kodiSort),
  }),
  properties: videoDetailsMovieSetProperties,
  setid: id(),
});

export const getMovieSetDetailsResponse = object({
  setdetails: object({
    ...videoDetailsMovieSet.entries,
    movies: array(videoDetailsMovie),
  }),
});

export const getGenresRequest = object({
  limits: optional(kodiLimits),
  properties: properties(libraryDetailsGenre, [
    "title",
    "thumbnail",
    "sourceid",
  ]),
  sort: optional(kodiSort),
  type: union([literal("movie"), literal("tvshow"), literal("musicvideo")]),
});

export const getGenresResponse = object({
  genres: array(libraryDetailsGenre),
  limits: kodiLimitsWithTotal,
});

export const getTVShowsRequest = object({
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: videoDetailsTVShowProperties,
  sort: optional(kodiSort),
});

export const getTVShowsResponse = object({
  limits: kodiLimitsWithTotal,
  tvshows: array(videoDetailsTVShow),
});

export const getSeasonsRequest = object({
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: videoDetailsSeasonProperties,
  sort: optional(kodiSort),
  tvshowid: id(),
});

export const getSeasonsResponse = object({
  limits: kodiLimitsWithTotal,
  seasons: array(videoDetailsSeason),
});

export const getTVShowDetailsRequest = object({
  properties: videoDetailsTVShowProperties,
  tvshowid: id(),
});

export const getTVShowDetailsResponse = object({
  tvshowdetails: videoDetailsTVShow,
});

export const getSeasonDetailsRequest = object({
  properties: videoDetailsSeasonProperties,
  seasonid: id(),
});

export const getSeasonDetailsResponse = object({
  seasondetails: videoDetailsSeason,
});

export const getEpisodesRequest = object({
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: videoDetailsEpisodeProperties,
  sort: optional(kodiSort),
  season: int(),
  tvshowid: id(),
});

export const getEpisodesResponse = object({
  episodes: array(videoDetailsEpisode),
  limits: kodiLimitsWithTotal,
});

export const getRecentlyAddedEpisodesRequest = object({
  limits: optional(kodiLimits),
  properties: videoDetailsEpisodeProperties,
  sort: optional(kodiSort),
});

export const getRecentlyAddedEpisodesResponse = getEpisodesResponse;

export const getRecentlyAddedMoviesRequest = object({
  limits: optional(kodiLimits),
  properties: videoDetailsMovieProperties,
  sort: optional(kodiSort),
});

export const getRecentlyAddedMoviesResponse = getMoviesResponse;

export const getEpisodeDetailsRequest = object({
  episodeid: id(),
  properties: videoDetailsEpisodeProperties,
});

export const getEpisodeDetailsResponse = object({
  episodedetails: videoDetailsEpisode,
});

export const getInProgressTVShowsRequest = object({
  limits: optional(kodiLimits),
  properties: videoDetailsTVShowProperties,
  sort: optional(kodiSort),
});

export const getInProgressTVShowsResponse = getTVShowsResponse;
