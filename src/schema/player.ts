import {
  array,
  boolean,
  literal,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

import { time } from "./base";
import { notificationItemType } from "./notifications";
import { id, int, properties } from "./utils";

const playerType = union([
  literal("internal"),
  literal("external"),
  literal("remote"),
]);

export const mediaType = union([
  literal("all"),
  literal("audio"),
  literal("video"),
]);

const activePlayer = object({
  playerid: id(),
  type: playerType,
});

const audioStream = object({
  bitrate: int(),
  channels: int(),
  codec: string(),
  index: number(),
  isdefault: boolean(),
  isimpaired: boolean(),
  isoriginal: boolean(),
  language: string(),
  name: string(),
  samplerate: int(),
});

const videoStream = object({
  codec: string(),
  height: int(),
  index: int(),
  language: string(),
  name: string(),
  width: int(),
});

const subtitle = object({
  index: int(),
  isdefault: boolean(),
  isimpaired: boolean(),
  isoriginal: boolean(),
  language: string(),
  name: string(),
});

const player = object({
  name: string(),
  playsaudio: boolean(),
  playsvideo: boolean(),
  type: playerType,
});

const playerItem = object({
  id: id(),
  type: notificationItemType,
});

const playerProperties = object({
  audiostreams: optional(array(audioStream)),
  cachepercentage: int(),
  canchangespeed: boolean(),
  canmove: boolean(),
  canrepeat: boolean(),
  canrotate: boolean(),
  canseek: boolean(),
  canshuffle: boolean(),
  canzoom: boolean(),
  currentaudiostream: optional(audioStream),
  currentsubtitle: optional(subtitle),
  currentvideostream: optional(videoStream),
  live: boolean(),
  partymode: boolean(),
  percentage: int(),
  playlistid: id(),
  position: int(),
  repeat: union([literal("off"), literal("one"), literal("all")]),
  shuffled: boolean(),
  speed: number(),
  subtitleenabled: boolean(),
  subtitles: optional(array(subtitle)),
  time,
  totaltime: time,
  type: playerType,
  videostreams: optional(array(videoStream)),
});

const speed = object({
  speed: int(),
});

export const getActivePlayersRequest = object({});

export const getActivePlayersResponse = array(activePlayer);

export const getPlayersRequest = object({
  media: mediaType,
});

export const getPlayersResponse = object({
  items: array(player),
});

export const getItemRequest = object({
  properties: properties(playerItem, ["type"]),
  playerid: id(),
});

export const getItemResponse = object({
  item: playerItem,
});

export const getPropertiesRequest = object({
  properties: properties(playerProperties, [
    "audiostreams",
    "cachepercentage",
    "canchangespeed",
    "canmove",
    "canrepeat",
    "canrotate",
    "canseek",
    "canshuffle",
    "canzoom",
    "currentaudiostream",
    "currentsubtitle",
    "currentvideostream",
    "live",
    "partymode",
    "percentage",
    "playlistid",
    "position",
    "repeat",
    "shuffled",
    "speed",
    "subtitleenabled",
    "subtitles",
    "time",
    "totaltime",
    "type",
    "videostreams",
  ]),
  playerid: id(),
});

export const getPropertiesResponse = object({
  ...playerProperties.entries,
  playerid: id(),
});

export const playPauseRequest = object({
  playerid: id(),
  play: optional(union([boolean(), literal("toggle")])),
});

export const playPauseResponse = speed;

export const stopRequest = object({
  playerid: id(),
});

export const stopResponse = string();
