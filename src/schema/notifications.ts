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

const notificationItemType = union([
  literal("unknown"),
  literal("movie"),
  literal("episode"),
  literal("song"),
  literal("picture"),
  literal("channel"),
]);

const notificationItem = object({
  id,
  type: notificationItemType,
});

const player = object({
  playerid: id,
  speed: number(),
});

const time = object({
  hours: int,
  milliseconds: pipe(number(), minValue(0), maxValue(999), integer()),
  minutes: pipe(number(), minValue(0), maxValue(59), integer()),
  sconds: pipe(number(), minValue(0), maxValue(59), integer()),
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
  failcount: int,
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

const applicationOnVolumeChange = createNotification(
  "Application.OnVolumeChange",
  object({
    muted: boolean(),
    volume: number(),
  }),
);

// notification types
// ###############

const audioLibraryOnCleanFinished = createNotification(
  "AudioLibrary.OnCleanFinished",
  string(),
);

const audioLibraryOnCleanStarted = createNotification(
  "AudioLibrary.OnCleanStarted",
  string(),
);

const audioLibraryOnExport = createNotification(
  "AudioLibrary.OnExport",
  onExport,
);

const audioLibraryOnRemove = createNotification(
  "AudioLibrary.OnRemove",
  onRemove,
);

const audioLibraryScanFinished = createNotification(
  "AudioLibrary.ScanFinished",
  string(),
);

const audioLibraryOnScanStarted = createNotification(
  "AudioLibrary.OnScanStarted",
  string(),
);

const audioLibraryOnUpdate = createNotification(
  "AudioLibrary.OnUpdate",
  onUpdate,
);

const guiOnDPMSActivated = createNotification("GUI.OnDPMSActivated", string());

const guiOnDPMSDeactivated = createNotification(
  "GUI.OnDPMSDeactivated",
  string(),
);

const guiOnScreensaverActivated = createNotification(
  "GUI.OnScreensaverActivated",
  string(),
);

const guiOnScreensaverDeactivated = createNotification(
  "GUI.OnScreensaverDeactivated",
  object({
    shuttingdown: boolean(),
  }),
);

const inputOnInputFinished = createNotification(
  "Input.OnInputFinished",
  string(),
);

const inputOnInputRequested = createNotification(
  "Input.OnInputRequested",
  object({
    title: string(),
    type: string(),
    value: string(),
  }),
);

const playerOnAVChange = createNotification(
  "Player.OnAVChange",
  notificationFromPlayer,
);

const playerOnAVStart = createNotification(
  "Player.OnAVStart",
  notificationFromPlayer,
);

const playerOnPause = createNotification(
  "Player.OnPause",
  notificationFromPlayer,
);

const playerOnPlay = createNotification(
  "Player.OnPlay",
  notificationFromPlayer,
);

const playerOnPropertyChanged = createNotification(
  "Player.OnPropertyChanged",
  object({
    player,
    value: unknown(),
  }),
);

const playerOnResume = createNotification(
  "Player.OnResume",
  notificationFromPlayer,
);

const playerOnSeek = createNotification(
  "Player.OnSeek",
  object({
    item: notificationItem,
    player: playerSeek,
  }),
);

const playerOnSpeedChanged = createNotification(
  "Player.OnSpeedChanged",
  notificationFromPlayer,
);

const playerOnStop = createNotification(
  "Player.OnStop",
  object({
    end: boolean(),
    item: notificationItem,
  }),
);

const playlistOnAdd = createNotification(
  "Playlist.OnAdd",
  object({
    item: notificationItem,
    playlistid: id,
    position: int,
  }),
);

const playlistOnClear = createNotification(
  "Playlist.OnClear",
  object({
    playlistid: id,
  }),
);

const playlistOnRemove = createNotification(
  "Playlist.OnClear",
  object({
    playlistid: id,
    position: int,
  }),
);

const systemOnLowBattery = createNotification("System.OnLowBattery", string());

const systemOnQuit = createNotification(
  "System.OnQuit",
  object({
    exitcode: int,
  }),
);

const systemOnRestart = createNotification("System.OnRestart", string());

const systemOnSleep = createNotification("System.OnSleep", string());

const systemOnWake = createNotification("System.OnWake", string());

const videoLibraryOnCleanFinished = createNotification(
  "VideoLibrary.OnCleanFinished",
  string(),
);

const videoLibraryOnCleanStarted = createNotification(
  "VideoLibrary.OnCleanStarted",
  string(),
);

const videoLibraryOnExport = createNotification(
  "VideoLibrary.OnExport",
  onExport,
);

const videoLibraryOnRefresh = createNotification(
  "VideoLibrary.OnRefresh",
  string(),
);

const videoLibraryOnRemove = createNotification(
  "VideoLibrary.OnRemove",
  onRemove,
);

const videoLibraryOnScanFinished = createNotification(
  "VideoLibrary.OnScanFinished",
  string(),
);

const videoLibraryOnScanStarted = createNotification(
  "VideoLibrary.OnScanStarted",
  string(),
);

const videoLibraryOnUpdate = createNotification(
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
  audioLibraryOnScanStarted,
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
