import {
  array,
  boolean,
  number,
  object,
  optional,
  string,
  union,
  type InferOutput,
} from "valibot";

import {
  itemDetailsBase,
  kodiFilters,
  kodiLimits,
  kodiLimitsWithTotal,
  kodiSort,
  mediaArtwork,
  mediaDetailsBase,
} from "./base";
import { libraryDetailsGenre } from "./library";
import { id, int, properties } from "./utils";

const audioDetailsBase = object({
  ...mediaDetailsBase.entries,
  art: optional(
    object({
      ...mediaArtwork.entries,
      "album.thumb": optional(string()),
    }),
  ),
  dateadded: optional(string()),
  genre: optional(array(string())),
});

const audioDetailsMedia = object({
  ...audioDetailsBase.entries,
  artist: optional(array(string())),
  artistid: optional(union([id(), array(id())])),
  displayartist: optional(string()),
  musicbrainzalbumartistid: optional(array(string())),
  originaldate: optional(string()),
  rating: optional(number()),
  releasedate: optional(string()),
  sortartist: optional(string()),
  title: optional(string()),
  userrating: optional(int()),
  votes: optional(int()),
  year: optional(int()),
});

const audioDetailsRole = object({
  ...itemDetailsBase.entries,
  roleid: id(),
  title: string(),
});

const audioDetailsGenre = object({
  genreid: id(),
  title: string(),
});

const audioDetailsAlbum = object({
  ...audioDetailsMedia.entries,
  albumid: id(),
  albumduration: optional(number()),
  albumlabel: optional(string()),
  albumstatus: optional(string()),
  compilation: optional(boolean()),
  description: optional(string()),
  isboxset: optional(boolean()),
  lastplayed: optional(string()),
  mood: optional(array(string())),
  musicbrainzalbumid: optional(string()),
  musicbrainzreleasegroupid: optional(string()),
  playcount: optional(int()),
  releasetype: optional(string()),
  songgenres: optional(array(audioDetailsGenre)),
  sourceid: optional(array(int())),
  style: optional(array(string())),
  theme: optional(array(string())),
  totaldiscs: optional(int()),
  type: optional(string()),
});

export type AudioDetailsAlbum = InferOutput<typeof audioDetailsAlbum>;

const audioDetailsArtist = object({
  ...audioDetailsBase.entries,
  artist: string(),
  artistid: int(),
  born: optional(string()),
  compilationartist: optional(boolean()),
  description: optional(string()),
  died: optional(string()),
  disambiguation: optional(string()),
  disbanded: optional(string()),
  formed: optional(string()),
  gender: optional(string()),
  instrument: optional(array(string())),
  isalbumartist: optional(boolean()),
  mood: optional(array(string())),
  musicbrainzartistid: optional(array(string())),
  roles: optional(array(audioDetailsRole)),
  songgenres: optional(array(audioDetailsGenre)),
  sortname: optional(string()),
  sourceid: optional(array(id())),
  style: optional(array(string())),
  type: string(),
  yearsactive: optional(array(string())),
});

export type AudioDetailsArtist = InferOutput<typeof audioDetailsArtist>;

const audioDetailsSong = object({
  ...audioDetailsMedia.entries,
  album: optional(string()),
  albumartist: optional(array(string())),
  albumartistid: optional(array(int())),
  albumid: optional(int()),
  albumreleasetype: optional(string()),
  bitrate: optional(string()),
  bpm: optional(string()),
  channels: optional(string()),
  comment: optional(string()),
  contributors: optional(array(string())),
  disc: optional(int()),
  disctitle: optional(string()),
  displaycomposer: optional(string()),
  displayconductor: optional(string()),
  displaylyricist: optional(string()),
  displayorchestra: optional(string()),
  duration: optional(int()),
  file: optional(string()),
  genreid: optional(array(int())),
  lastplayed: optional(string()),
  lyrics: optional(string()),
  mood: optional(string()),
  musicbrainzalbumid: optional(array(string())),
  musicbrainzalbumartistid: optional(array(string())),
  musicbrainzartistid: optional(array(string())),
  musicbrainztrackid: optional(string()),
  playcount: optional(int()),
  samplerate: optional(string()),
  songid: id(),
  sourceid: optional(array(id())),
  track: optional(int()),
});

export type AudioDetailsSong = InferOutput<typeof audioDetailsSong>;

const audioPropertyValue = object({
  albumslastadded: optional(string()),
  albumsmodified: optional(string()),
  artistlinksupdated: optional(string()),
  artistslastadded: optional(string()),
  artistsmodified: optional(string()),
  genreslastadded: optional(string()),
  genresmodified: optional(string()),
  librarylastcleaned: optional(string()),
  librarylastupdated: optional(string()),
  missingartistid: optional(id()),
  songslastadded: optional(string()),
  songsmodified: optional(string()),
});

const audioDetailsAlbumProperties = properties(audioDetailsAlbum, [
  "title",
  "description",
  "artist",
  "genre",
  "theme",
  "mood",
  "style",
  "type",
  "albumlabel",
  "rating",
  "votes",
  "userrating",
  "year",
  "musicbrainzalbumid",
  "musicbrainzalbumartistid",
  "fanart",
  "thumbnail",
  "playcount",
  "artistid",
  "displayartist",
  "compilation",
  "releasetype",
  "dateadded",
  "sortartist",
  "musicbrainzreleasegroupid",
  "songgenres",
  "art",
  "lastplayed",
  "sourceid",
  "isboxset",
  "totaldiscs",
  "releasedate",
  "originaldate",
  "albumstatus",
  "albumduration",
]);

const audioDetailsArtistProperties = properties(audioDetailsArtist, [
  "instrument",
  "style",
  "mood",
  "born",
  "formed",
  "description",
  "genre",
  "died",
  "disbanded",
  "yearsactive",
  "musicbrainzartistid",
  "fanart",
  "thumbnail",
  "compilationartist",
  "dateadded",
  "roles",
  "songgenres",
  "isalbumartist",
  "sortname",
  "type",
  "gender",
  "disambiguation",
  "art",
  "sourceid",
]);

const audioDetailsSongProperties = properties(audioDetailsSong, [
  "title",
  "artist",
  "albumartist",
  "genre",
  "year",
  "rating",
  "album",
  "track",
  "duration",
  "comment",
  "lyrics",
  "musicbrainztrackid",
  "musicbrainzartistid",
  "musicbrainzalbumid",
  "musicbrainzalbumartistid",
  "playcount",
  "fanart",
  "thumbnail",
  "file",
  "albumid",
  "lastplayed",
  "disc",
  "genreid",
  "artistid",
  "displayartist",
  "albumartistid",
  "albumreleasetype",
  "dateadded",
  "votes",
  "userrating",
  "mood",
  "contributors",
  "displaycomposer",
  "displayconductor",
  "displayorchestra",
  "displaylyricist",
  "sortartist",
  "art",
  "sourceid",
  "disctitle",
  "releasedate",
  "originaldate",
  "bpm",
  "samplerate",
  "bitrate",
  "channels",
]);

export const getPropertiesRequest = object({
  properties: properties(audioPropertyValue, [
    "albumslastadded",
    "albumsmodified",
    "artistlinksupdated",
    "artistslastadded",
    "artistsmodified",
    "genreslastadded",
    "genresmodified",
    "librarylastcleaned",
    "librarylastupdated",
    "missingartistid",
    "songslastadded",
    "songsmodified",
  ]),
});

export const getPropertiesResponse = audioPropertyValue;

export const getAlbumDetailsRequest = object({
  albumid: id(),
  properties: audioDetailsAlbumProperties,
});

export const getAlbumDetailsResponse = object({
  albumdetails: audioDetailsAlbum,
});

export const getArtistDetailsRequest = object({
  artistid: id(),
  properties: audioDetailsArtistProperties,
});

export const getArtistDetailsResponse = object({
  artistdetails: audioDetailsArtist,
});

export const getArtistsRequest = object({
  albumartistsonly: optional(boolean()),
  allroles: optional(boolean()),
  filter: optional(kodiFilters),
  limits: optional(kodiLimits),
  properties: audioDetailsArtistProperties,
  sort: optional(kodiSort),
});

export const getArtistsResponse = object({
  artists: array(audioDetailsArtist),
  limits: kodiLimitsWithTotal,
});

export const getAlbumsRequest = object({
  allroles: optional(boolean()),
  filter: optional(kodiFilters),
  includesingles: optional(boolean()),
  limits: optional(kodiLimits),
  properties: audioDetailsAlbumProperties,
  sort: optional(kodiSort),
});

export const getAlbumsResponse = object({
  albums: array(audioDetailsAlbum),
  limits: kodiLimitsWithTotal,
});

export const getGenresRequest = object({
  limits: optional(kodiLimits),
  properties: properties(libraryDetailsGenre, [
    "title",
    "thumbnail",
    "sourceid",
  ]),
  sort: optional(kodiSort),
});

export const getGenresResponse = object({
  genres: array(libraryDetailsGenre),
  limits: kodiLimitsWithTotal,
});

export const getSongsRequest = object({
  allroles: optional(boolean()),
  filter: optional(kodiFilters),
  includesingles: optional(boolean()),
  limits: optional(kodiLimits),
  properties: audioDetailsSongProperties,
  singlesonly: optional(boolean()),
  sort: optional(kodiSort),
});

export const getSongsResponse = object({
  limits: kodiLimitsWithTotal,
  songs: array(audioDetailsSong),
});

export const getRecentlyAddedAlbumsRequest = object({
  limits: optional(kodiLimits),
  properties: audioDetailsAlbumProperties,
  sort: optional(kodiSort),
});

export const getRecentlyAddedAlbumsResponse = object({
  albums: array(audioDetailsAlbum),
  limits: kodiLimitsWithTotal,
});

export const getSongDetailsRequest = object({
  properties: audioDetailsSongProperties,
  songid: id(),
});

export const getSongDetailsResponse = object({
  songdetails: audioDetailsSong,
});
