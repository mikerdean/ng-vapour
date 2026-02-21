import {
  BaseIssue,
  BaseSchema,
  boolean,
  integer,
  literal,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
  string,
  union,
  unknown,
  variant,
  type InferOutput,
  type Literal,
} from "valibot";

import { jsonRpc } from "@vapour/schema/base";

const int = pipe(number(), integer());
const id = int;

function createNotification<TLiteral extends Literal, TInput, TOutput>(
  method: TLiteral,
  schema: BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
) {
  return object({
    ...jsonRpc.entries,
    method: literal<TLiteral>(method),
    params: object({
      data: schema,
      sender: string(),
    }),
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
  id,
  type: notificationItemType,
});

export const player = object({
  playerid: id,
  speed: number(),
});

export const time = object({
  hours: int,
  milliseconds: pipe(number(), minValue(0), maxValue(999), integer()),
  minutes: pipe(number(), minValue(0), maxValue(59), integer()),
  sconds: pipe(number(), minValue(0), maxValue(59), integer()),
});

export const playerSeek = object({
  ...player.entries,
  seekoffset: time,
  time,
});

export const notificationFromPlayer = object({
  item: notificationItem,
  player: player,
});

const onExport = object({
  failcount: int,
  file: string(),
});

const onRemove = object({
  id: union([string(), number()]),
  transaction: optional(boolean()),
  type: string(),
});

export const onUpdate = object({
  added: boolean(),
  id: union([string(), number()]),
  transaction: optional(boolean()),
  type: string(),
});

export const applicationOnVolumeChange = createNotification(
  "Application.OnVolumeChange",
  object({
    muted: boolean(),
    volume: number(),
  }),
);

// notification types
// ###############

export const audioLibraryOnCleanFinished = createNotification(
  "AudioLibrary.OnCleanFinished",
  string(),
);

export const audioLibraryOnCleanStarted = createNotification(
  "AudioLibrary.OnCleanStarted",
  string(),
);

export const audioLibraryOnExport = createNotification(
  "AudioLibrary.OnExport",
  onExport,
);

export const audioLibraryOnRemove = createNotification(
  "AudioLibrary.OnRemove",
  onRemove,
);

export const audioLibraryScanFinished = createNotification(
  "AudioLibrary.ScanFinished",
  string(),
);

export const audioLibraryOnScanStarted = createNotification(
  "AudioLibrary.OnScanStarted",
  string(),
);

export const audioLibraryOnUpdate = createNotification(
  "AudioLibrary.OnUpdate",
  onUpdate,
);

export const guiOnDPMSActivated = createNotification(
  "GUI.OnDPMSActivated",
  string(),
);

export const guiOnDPMSDeactivated = createNotification(
  "GUI.OnDPMSDeactivated",
  string(),
);

export const guiOnScreensaverActivated = createNotification(
  "GUI.OnScreensaverActivated",
  string(),
);

export const guiOnScreensaverDeactivated = createNotification(
  "GUI.OnScreensaverDeactivated",
  object({
    shuttingdown: boolean(),
  }),
);

export const inputOnInputFinished = createNotification(
  "Input.OnInputFinished",
  string(),
);

export const inputOnInputRequested = createNotification(
  "Input.OnInputRequested",
  object({
    title: string(),
    type: string(),
    value: string(),
  }),
);

export const playerOnAVChange = createNotification(
  "Player.OnAVChange",
  notificationFromPlayer,
);

export const playerOnAVStart = createNotification(
  "Player.OnAVStart",
  notificationFromPlayer,
);

export const playerOnPause = createNotification(
  "Player.OnPause",
  notificationFromPlayer,
);

export const playerOnPlay = createNotification(
  "Player.OnPlay",
  notificationFromPlayer,
);

export const playerOnPropertyChanged = createNotification(
  "Player.OnPropertyChanged",
  object({
    player,
    value: unknown(),
  }),
);

export const playerOnResume = createNotification(
  "Player.OnResume",
  notificationFromPlayer,
);

export const playerOnSeek = createNotification(
  "Player.OnSeek",
  object({
    item: notificationItem,
    player: playerSeek,
  }),
);

export const playerOnSpeedChanged = createNotification(
  "Player.OnSpeedChanged",
  notificationFromPlayer,
);

export const playerOnStop = createNotification(
  "Player.OnStop",
  object({
    end: boolean(),
    item: notificationItem,
  }),
);

export const playlistOnAdd = createNotification(
  "Playlist.OnAdd",
  object({
    item: notificationItem,
    playlistid: id,
    position: int,
  }),
);

export const playlistOnClear = createNotification(
  "Playlist.OnClear",
  object({
    playlistid: id,
  }),
);

export const playlistOnRemove = createNotification(
  "Playlist.OnClear",
  object({
    playlistid: id,
    position: int,
  }),
);

export const systemOnLowBattery = createNotification(
  "System.OnLowBattery",
  string(),
);

export const systemOnQuit = createNotification(
  "System.OnQuit",
  object({
    exitcode: int,
  }),
);

export const systemOnRestart = createNotification("System.OnRestart", string());

export const systemOnSleep = createNotification("System.OnSleep", string());

export const systemOnWake = createNotification("System.OnWake", string());

export const videoLibraryOnCleanFinished = createNotification(
  "VideoLibrary.OnCleanFinished",
  string(),
);

export const videoLibraryOnCleanStarted = createNotification(
  "VideoLibrary.OnCleanStarted",
  string(),
);

export const videoLibraryOnExport = createNotification(
  "VideoLibrary.OnExport",
  onExport,
);

export const videoLibraryOnRefresh = createNotification(
  "VideoLibrary.OnRefresh",
  string(),
);

export const videoLibraryOnRemove = createNotification(
  "VideoLibrary.OnRemove",
  onRemove,
);

export const videoLibraryOnScanFinished = createNotification(
  "VideoLibrary.OnScanFinished",
  string(),
);

export const videoLibraryOnScanStarted = createNotification(
  "VideoLibrary.OnScanStarted",
  string(),
);

export const videoLibraryOnUpdate = createNotification(
  "VideoLibrary.OnUpdate",
  onUpdate,
);

export const notifications = variant("method", [
  applicationOnVolumeChange,
  audioLibraryOnCleanFinished,
  audioLibraryOnCleanStarted,
  audioLibraryOnExport,
  audioLibraryOnRemove,
  audioLibraryScanFinished,
  audioLibraryOnUpdate,
  guiOnDPMSActivated,
  guiOnDPMSDeactivated,
  guiOnScreensaverActivated,
  guiOnScreensaverDeactivated,
  inputOnInputFinished,
  inputOnInputRequested,
  playerOnAVChange,
  playerOnAVStart,
  playerOnPause,
  playerOnPlay,
  playerOnPropertyChanged,
  playerOnResume,
  playerOnSeek,
  playerOnSpeedChanged,
  playerOnStop,
  playlistOnAdd,
  playlistOnClear,
  playlistOnRemove,
  systemOnLowBattery,
  systemOnQuit,
  systemOnRestart,
  systemOnSleep,
  systemOnWake,
  videoLibraryOnCleanFinished,
  videoLibraryOnCleanStarted,
  videoLibraryOnExport,
  videoLibraryOnRefresh,
  videoLibraryOnRemove,
  videoLibraryOnScanFinished,
  videoLibraryOnScanStarted,
  videoLibraryOnUpdate,
]);

export type Notifications = InferOutput<typeof notifications>;

export type NotificationEvents = {
  [N in Notifications as N["method"]]: (event: N["params"]) => void;
};
