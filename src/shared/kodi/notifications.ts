export type Notification<T> = {
  data: T;
  sender: string;
};

export type NotificationAsString = Notification<string>;

export type NotificationFromPlayer = Notification<{
  item: NotificationItem;
  player: Player;
}>;

export type NotificationItemType =
  | "unknown"
  | "movie"
  | "episode"
  | "song"
  | "picture"
  | "channel";

export type NotificationItem = {
  id: number;
  type: NotificationItemType;
};

export type Player = {
  playerid: number;
  speed: number;
};

export type PlayerSeek = Player & {
  seekoffset: Time;
  time: Time;
};

export type Time = {
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
};

export type PlaylistOnAdd = Notification<{
  item: NotificationItem;
  playlistid: number;
  position: number;
}>;

export type PlaylistOnClear = Notification<{
  playlistid: number;
}>;

export type PlaylistOnRemove = Notification<{
  playlistid: number;
  position: number;
}>;

export type OnExport = Notification<{
  failcount: number;
  file: string;
}>;

export type OnInputRequested = Notification<{
  title: string;
  type: string;
  value: string;
}>;

export type OnPropertyChanged = Notification<{
  player: Player;
  value: unknown;
}>;

export type OnRemove = Notification<{
  id: string | number;
  transaction?: boolean;
  type: string;
}>;

export type OnScreensaverDeactivated = Notification<{
  shuttingdown: boolean;
}>;

export type OnSeek = Notification<{
  item: NotificationItem;
  player: PlayerSeek;
}>;

export type OnQuit = Notification<{
  exitcode: number;
}>;

export type OnUpdate = Notification<{
  added: boolean;
  id: string | number;
  transaction?: boolean;
  type: string;
}>;

export type OnVolumeChange = Notification<{
  muted: boolean;
  volume: number;
}>;

export type NotificationMap = {
  "Application.OnVolumeChange": OnVolumeChange;

  "AudioLibrary.OnCleanFinished": NotificationAsString;
  "AudioLibrary.OnCleanStarted": NotificationAsString;
  "AudioLibrary.OnExport": OnExport;
  "AudioLibrary.OnRemove": OnRemove;
  "AudioLibrary.ScanFinished": NotificationAsString;
  "AudioLibrary.OnScanStarted": NotificationAsString;
  "AudioLibrary.OnUpdate": OnUpdate;

  "GUI.OnDPMSActivated": NotificationAsString;
  "GUI.OnDPMSDeactivated": NotificationAsString;
  "GUI.OnScreensaverActivated": NotificationAsString;
  "GUI.OnScreensaverDeactivated": OnScreensaverDeactivated;

  "Input.OnInputFinished": NotificationAsString;
  "Input.OnInputRequested": OnInputRequested;

  "Player.OnAVChange": NotificationFromPlayer;
  "Player.OnAVStart": NotificationFromPlayer;
  "Player.OnPause": NotificationFromPlayer;
  "Player.OnPlay": NotificationFromPlayer;
  "Player.OnPropertyChanged": OnPropertyChanged;
  "Player.OnResume": NotificationFromPlayer;
  "Player.OnSeek": OnSeek;
  "Player.OnSpeedChanged": NotificationFromPlayer;
  "Player.OnStop": NotificationFromPlayer;

  "Playlist.OnAdd": PlaylistOnAdd;
  "Playlist.OnClear": PlaylistOnClear;
  "Playlist.OnRemove": PlaylistOnRemove;

  "System.OnLowBattery": NotificationAsString;
  "System.OnQuit": OnQuit;
  "System.OnRestart": NotificationAsString;
  "System.OnSleep": NotificationAsString;
  "System.OnWake": NotificationAsString;

  "VideoLibrary.OnCleanFinished": NotificationAsString;
  "VideoLibrary.OnCleanStarted": NotificationAsString;
  "VideoLibrary.OnExport": OnExport;
  "VideoLibrary.OnRefresh": NotificationAsString;
  "VideoLibrary.OnRemove": OnRemove;
  "VideoLibrary.ScanFinished": NotificationAsString;
  "VideoLibrary.OnScanStarted": NotificationAsString;
  "VideoLibrary.OnUpdate": OnUpdate;
};
