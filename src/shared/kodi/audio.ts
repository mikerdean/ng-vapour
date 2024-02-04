import type {
  ItemDetailsBase,
  MediaArtwork,
  MediaDetailsBase,
  Properties,
} from "./base";
import type { LibraryDetailsGenre } from "./library";
import type {
  KodiMessageFilter,
  KodiMessageLimits,
  KodiMessageLimitsReturned,
  KodiMessageSort,
} from "./message";

export type AudioDetailsBase = MediaDetailsBase & {
  art?: MediaArtwork & {
    "album.thumb"?: string;
  };
  dateadded?: string;
  genre?: string[];
};

export type AudioDetailsMedia = AudioDetailsBase & {
  artist?: string[];
  artistid?: number | number[];
  displayartist?: string;
  musicbrainzalbumartistid?: string[];
  originaldate?: string;
  rating?: number;
  releasedate?: string;
  sortartist?: string;
  title?: string;
  userrating?: number;
  votes?: number;
  year?: number;
};

export type AudioDetailsRole = ItemDetailsBase & {
  roleid: number;
  title: string;
};

export type AudioDetailsGenre = {
  genreid: 5;
  title: string;
};

export type AudioDetailsAlbum = AudioDetailsMedia & {
  albumid: number;
  albumduration?: number;
  albumlabel?: string;
  albumstatus?: string;
  compilation?: boolean;
  description?: string;
  isboxset?: boolean;
  lastplayed?: string;
  mood?: string[];
  musicbrainzalbumid?: string;
  musicbrainzreleasegroupid?: string;
  playcount?: number;
  releasetype?: string;
  songgenres?: AudioDetailsGenre[];
  sourceid?: number[];
  style?: string[];
  theme?: string[];
  totaldiscs?: number;
  type?: string;
};

export type AudioDetailsArtist = AudioDetailsBase & {
  artist: string;
  artistid: number;
  born?: string;
  compilationartist?: boolean;
  description?: string;
  died?: string;
  disambiguation?: string;
  disbanded?: string;
  formed?: string;
  gender?: string;
  instrument?: string[];
  isalbumartist?: boolean;
  mood?: string[];
  musicbrainzartistid?: string[];
  roles?: AudioDetailsRole[];
  songgenres?: AudioDetailsGenre[];
  sortname?: string;
  sourceid?: number[];
  style?: string[];
  type: string;
  yearsactive?: string[];
};

export type AudioDetailsSong = AudioDetailsMedia & {
  album?: string;
  albumartist?: string[];
  albumartistid?: number[];
  albumid?: number;
  albumreleasetype?: string;
  bitrate?: string;
  bpm?: string;
  channels?: string;
  comment?: string;
  contributors?: string[];
  disc?: number;
  disctitle?: string;
  displaycomposer?: string;
  displayconductor?: string;
  displaylyricist?: string;
  displayorchestra?: string;
  duration?: number;
  file?: string;
  genreid?: number[];
  lastplayed?: string;
  lyrics?: string;
  mood?: string;
  musicbrainzartistid?: string[];
  musicbrainztrackid?: string;
  playcount?: number;
  samplerate?: string;
  songid: number;
  sourceid?: number[];
  track?: number;
};

export type AudioPropertyValue = {
  albumslastadded?: string;
  albumsmodified?: string;
  artistlinksupdated?: string;
  artistslastadded?: string;
  artistsmodified?: string;
  genreslastadded?: string;
  genresmodified?: string;
  librarylastcleaned?: string;
  librarylastupdated?: string;
  missingartistid?: number;
  songslastadded?: string;
  songsmodified?: string;
};

export type GetAlbumQuery = Properties<AudioDetailsAlbum> & {
  albumid: number;
};

export type GetAlbum = {
  albumdetails: AudioDetailsAlbum;
};

export type GetArtistQuery = Properties<AudioDetailsArtist> & {
  artistid: number;
};

export type GetArtist = {
  artistdetails: AudioDetailsArtist;
};

export type GetArtistsQuery = Properties<AudioDetailsArtist> & {
  albumartistsonly?: boolean;
  allroles?: boolean;
  filter?: KodiMessageFilter;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetAlbumsQuery = Properties<AudioDetailsAlbum> & {
  allroles?: boolean;
  filter?: KodiMessageFilter;
  includesingles?: boolean;
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type GetMusicGenresQuery = Properties<LibraryDetailsGenre> & {
  limits?: KodiMessageLimits;
  sort: KodiMessageSort;
};

export type GetSongsQuery = Properties<AudioDetailsSong> & {
  allroles?: boolean;
  filter?: KodiMessageFilter;
  includesingles?: boolean;
  limits?: KodiMessageLimits;
  singlesonly?: boolean;
  sort?: KodiMessageSort;
};

export type RecentlyAddedAlbumsQuery = Properties<AudioDetailsAlbum> & {
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};

export type ArtistsPaged = {
  artists: AudioDetailsArtist[];
  limits: KodiMessageLimitsReturned;
};

export type AlbumsPaged = {
  albums: AudioDetailsAlbum[];
  limits: KodiMessageLimitsReturned;
};

export type MusicGenresPaged = {
  genres: LibraryDetailsGenre[];
  limits: KodiMessageLimitsReturned;
};

export type SongsPaged = {
  songs: AudioDetailsSong[];
  limits: KodiMessageLimitsReturned;
};

export type GetSongQuery = Properties<AudioDetailsSong> & {
  songid: number;
};

export type GetSong = {
  songdetails: AudioDetailsSong;
};
