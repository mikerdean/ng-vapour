import {
  boolean,
  literal,
  number,
  object,
  optional,
  string,
  union,
  unknown,
  type GenericSchema,
} from "valibot";

import { time } from "./base";
import { id, int } from "./utils";

function createNotification<TInput, TOutput>(
  schema: GenericSchema<TInput, TOutput>,
) {
  return object({
    data: schema,
    sender: string(),
  });
}

export const notificationItemType = union([
  literal("unknown"),
  literal("movie"),
  literal("episode"),
  literal("song"),
  literal("picture"),
  literal("channel"),
]);

export const notificationItem = object({
  id: id(),
  type: notificationItemType,
});

const player = object({
  playerid: id(),
  speed: number(),
});

const playerSeek = object({
  ...player.entries,
  seekoffset: time,
  time,
});

const notificationFromPlayer = object({
  item: notificationItem,
  player: player,
});

const onExport = object({
  failcount: int(),
  file: string(),
});

const onRemove = object({
  id: union([string(), number()]),
  transaction: optional(boolean()),
  type: string(),
});

const onUpdate = object({
  added: boolean(),
  id: union([string(), number()]),
  transaction: optional(boolean()),
  type: string(),
});

export const applicationOnVolumeChange = createNotification(
  object({
    muted: boolean(),
    volume: number(),
  }),
);

export const audioLibraryOnCleanFinished = createNotification(string());

export const audioLibraryOnCleanStarted = createNotification(string());

export const audioLibraryOnExport = createNotification(onExport);

export const audioLibraryOnRemove = createNotification(onRemove);

export const audioLibraryOnScanFinished = createNotification(string());

export const audioLibraryOnScanStarted = createNotification(string());

export const audioLibraryOnUpdate = createNotification(onUpdate);

export const guiOnDPMSActivated = createNotification(string());

export const guiOnDPMSDeactivated = createNotification(string());

export const guiOnScreensaverActivated = createNotification(string());

export const guiOnScreensaverDeactivated = createNotification(
  object({
    shuttingdown: boolean(),
  }),
);

export const inputOnInputFinished = createNotification(string());

export const inputOnInputRequested = createNotification(
  object({
    title: string(),
    type: string(),
    value: string(),
  }),
);

export const playerOnAVChange = createNotification(notificationFromPlayer);

export const playerOnAVStart = createNotification(notificationFromPlayer);

export const playerOnPause = createNotification(notificationFromPlayer);

export const playerOnPlay = createNotification(notificationFromPlayer);

export const playerOnPropertyChanged = createNotification(
  object({
    player,
    value: unknown(),
  }),
);

export const playerOnResume = createNotification(notificationFromPlayer);

export const playerOnSeek = createNotification(
  object({
    item: notificationItem,
    player: playerSeek,
  }),
);

export const playerOnSpeedChanged = createNotification(notificationFromPlayer);

export const playerOnStop = createNotification(
  object({
    end: boolean(),
    item: notificationItem,
  }),
);

export const playlistOnAdd = createNotification(
  object({
    item: notificationItem,
    playlistid: id(),
    position: int(),
  }),
);

export const playlistOnClear = createNotification(
  object({
    playlistid: id(),
  }),
);

export const playlistOnRemove = createNotification(
  object({
    playlistid: id(),
    position: int(),
  }),
);

export const systemOnLowBattery = createNotification(string());

export const systemOnQuit = createNotification(
  object({
    exitcode: int(),
  }),
);

export const systemOnRestart = createNotification(string());

export const systemOnSleep = createNotification(string());

export const systemOnWake = createNotification(string());

export const videoLibraryOnCleanFinished = createNotification(string());

export const videoLibraryOnCleanStarted = createNotification(string());

export const videoLibraryOnExport = createNotification(onExport);

export const videoLibraryOnRefresh = createNotification(string());

export const videoLibraryOnRemove = createNotification(onRemove);

export const videoLibraryOnScanFinished = createNotification(string());

export const videoLibraryOnScanStarted = createNotification(string());

export const videoLibraryOnUpdate = createNotification(onUpdate);
