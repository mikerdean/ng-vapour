import type { ItemDetailsBase, Properties } from "@vapour/shared/kodi/base";
import type {
  KodiMessageLimits,
  KodiMessageLimitsReturned,
} from "@vapour/shared/kodi/message";

export type AddonDependency = {
  addonid: string;
  optional: boolean;
  version: string;
};

export type AddonExtraInfo = {
  key: string;
  value: string;
};

export type AddonDetails = ItemDetailsBase & {
  addonid: string;
  author?: string;
  broken?: boolean;
  dependencies?: AddonDependency[];
  deprecated?: boolean;
  description?: string;
  disclaimer?: string;
  enabled?: boolean;
  extrainfo?: AddonExtraInfo[];
  fanart?: string;
  installed?: boolean;
  name?: string;
  path?: string;
  rating?: number;
  summary?: string;
  thumbnail?: string;
  type: AddonType;
  version?: string;
};

export type AddonContent =
  | "unknown"
  | "video"
  | "audio"
  | "image"
  | "executable";

export type AddonType =
  | "unknown"
  | "xbmc.player.musicviz"
  | "xbmc.gui.skin"
  | "kodi.pvrclient"
  | "kodi.inputstream"
  | "kodi.gameclient"
  | "kodi.peripheral"
  | "xbmc.python.script"
  | "xbmc.python.weather"
  | "xbmc.subtitle.module"
  | "xbmc.python.lyrics"
  | "xbmc.metadata.scraper.albums"
  | "xbmc.metadata.scraper.artists"
  | "xbmc.metadata.scraper.movies"
  | "xbmc.metadata.scraper.musicvideos"
  | "xbmc.metadata.scraper.tvshows"
  | "xbmc.ui.screensaver"
  | "xbmc.python.pluginsource"
  | "xbmc.addon.repository"
  | "xbmc.webinterface"
  | "xbmc.service"
  | "kodi.audioencoder"
  | "kodi.context.item"
  | "kodi.audiodecoder"
  | "kodi.resource.images"
  | "kodi.resource.language"
  | "kodi.resource.uisounds"
  | "kodi.resource.games"
  | "kodi.resource.font"
  | "kodi.vfs"
  | "kodi.imagedecoder"
  | "xbmc.metadata.scraper.library"
  | "xbmc.python.library"
  | "xbmc.python.module"
  | "kodi.game.controller"
  | "xbmc.addon.video"
  | "xbmc.addon.audio"
  | "xbmc.addon.image"
  | "xbmc.addon.executable"
  | "kodi.addon.game";

export type GetAddonsQuery = Properties<AddonDetails> &
  GetAddonsQueryFilters & {
    limits?: KodiMessageLimits;
  };

export type GetAddonsQueryFilters = {
  content?: AddonContent;
  enabled?: boolean;
  installed?: boolean;
  types?: AddonType;
};

export type GetAddons = {
  addons: AddonDetails[];
  limits: KodiMessageLimitsReturned;
};

export type GetAddonQuery = Properties<AddonDetails> & {
  addonid: string;
};

export type GetAddon = {
  addon: AddonDetails;
};
