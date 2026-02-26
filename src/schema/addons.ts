import {
  array,
  boolean,
  literal,
  number,
  object,
  optional,
  string,
  union,
  type InferOutput,
} from "valibot";

import { itemDetailsBase, kodiLimits, kodiLimitsWithTotal } from "./base";
import { properties } from "./utils";

const addonDependency = object({
  addonid: string(),
  optional: boolean(),
  version: string(),
});

const addonExtraInfo = object({
  key: string(),
  value: string(),
});

const addonType = union([
  literal("unknown"),
  literal("xbmc.player.musicviz"),
  literal("xbmc.gui.skin"),
  literal("kodi.pvrclient"),
  literal("kodi.inputstream"),
  literal("kodi.gameclient"),
  literal("kodi.peripheral"),
  literal("xbmc.python.script"),
  literal("xbmc.python.weather"),
  literal("xbmc.subtitle.module"),
  literal("xbmc.python.lyrics"),
  literal("xbmc.metadata.scraper.albums"),
  literal("xbmc.metadata.scraper.artists"),
  literal("xbmc.metadata.scraper.movies"),
  literal("xbmc.metadata.scraper.musicvideos"),
  literal("xbmc.metadata.scraper.tvshows"),
  literal("xbmc.ui.screensaver"),
  literal("xbmc.python.pluginsource"),
  literal("xbmc.addon.repository"),
  literal("xbmc.webinterface"),
  literal("xbmc.service"),
  literal("kodi.audioencoder"),
  literal("kodi.context.item"),
  literal("kodi.audiodecoder"),
  literal("kodi.resource.images"),
  literal("kodi.resource.language"),
  literal("kodi.resource.uisounds"),
  literal("kodi.resource.games"),
  literal("kodi.resource.font"),
  literal("kodi.vfs"),
  literal("kodi.imagedecoder"),
  literal("xbmc.metadata.scraper.library"),
  literal("xbmc.python.library"),
  literal("xbmc.python.module"),
  literal("kodi.game.controller"),
  literal(""),
  literal("xbmc.addon.video"),
  literal("xbmc.addon.audio"),
  literal("xbmc.addon.image"),
  literal("xbmc.addon.executable"),
  literal("kodi.addon.game"),
]);

const addonContent = union([
  literal("unknown"),
  literal("video"),
  literal("audio"),
  literal("image"),
  literal("executable"),
]);

const addonDetails = object({
  ...itemDetailsBase.entries,
  addonid: string(),
  author: optional(string()),
  broken: optional(boolean()),
  dependencies: optional(array(addonDependency)),
  deprecated: optional(boolean()),
  description: optional(string()),
  disclaimer: optional(string()),
  enabled: optional(boolean()),
  extrainfo: optional(array(addonExtraInfo)),
  fanart: optional(string()),
  installed: optional(boolean()),
  name: optional(string()),
  path: optional(string()),
  rating: optional(number()),
  summary: optional(string()),
  thumbnail: optional(string()),
  type: addonType,
  version: optional(string()),
});

export type AddonDetails = InferOutput<typeof addonDetails>;

const addonDetailsProperties = properties(addonDetails, [
  "name",
  "version",
  "summary",
  "description",
  "path",
  "author",
  "thumbnail",
  "disclaimer",
  "fanart",
  "dependencies",
  "broken",
  "extrainfo",
  "rating",
  "enabled",
  "installed",
  "deprecated",
]);

export const addonQueryFilters = object({
  content: optional(addonContent),
  enabled: optional(boolean()),
  installed: optional(boolean()),
  type: optional(addonType),
});

export const getAddonsRequest = object({
  ...addonQueryFilters.entries,
  limits: optional(kodiLimits),
  properties: addonDetailsProperties,
});

export const getAddonsResponse = object({
  addons: array(addonDetails),
  limits: kodiLimitsWithTotal,
});

export const getAddonDetailsRequest = object({
  addonid: string(),
  properties: addonDetailsProperties,
});

export const getAddonDetailsResponse = object({
  addon: addonDetails,
});
