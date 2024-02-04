import type { Properties } from "./base";
import type { NotificationItemType, Time } from "./notifications";

export type PlayerType = "internal" | "external" | "remote";

export type MediaType = "all" | "audio" | "video";

export type ActivePlayer = {
  playerid: number;
  type: PlayerType;
};

export type AudioStream = {
  bitrate: number;
  channels: number;
  codec: string;
  index: number;
  isdefault: boolean;
  isimpaired: boolean;
  isoriginal: boolean;
  language: string;
  name: string;
  samplerate: number;
};

export type VideoStream = {
  codec: string;
  height: number;
  index: number;
  language: string;
  name: string;
  width: number;
};

export type Subtitle = {
  index: number;
  isdefault: boolean;
  isimpaired: boolean;
  isoriginal: boolean;
  language: string;
  name: string;
};

export type Player = {
  name: string;
  playsaudio: boolean;
  playsvideo: boolean;
  type: PlayerType;
};

export type PlayerItem = {
  id: number;
  type: NotificationItemType;
};

export type GetActivePlayers = ActivePlayer[];

export type GetPlayersQuery = {
  media: MediaType;
};

export type GetPlayers = {
  items: Player[];
};

export type GetPlayerItemQuery = Properties<PlayerItem> & {
  playerid: number;
};

export type GetPlayerItem = {
  item: PlayerItem;
};

export type GetPlayerPropertiesQuery = Properties<GetPlayerProperties> & {
  playerid: number;
};

export type GetPlayerProperties = {
  audiostreams?: AudioStream[];
  cachepercentage: number;
  canchangespeed: boolean;
  canmove: boolean;
  canrepeat: boolean;
  canrotate: boolean;
  canseek: boolean;
  canshuffle: boolean;
  canzoom: boolean;
  currentaudiostream?: AudioStream;
  currentsubtitle?: Subtitle;
  currentvideostream?: VideoStream;
  live: boolean;
  partymode: boolean;
  percentage: number;
  playlistid: number;
  position: number;
  repeat: "off" | "one" | "all";
  shuffled: boolean;
  speed: number;
  subtitleenabled: boolean;
  subtitles?: Subtitle[];
  time: Time;
  totaltime: Time;
  type: PlayerType;
  videostreams?: VideoStream[];
};
