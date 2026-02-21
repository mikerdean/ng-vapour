/* eslint-disable @typescript-eslint/no-dynamic-delete */

import { computed, Injectable, OnDestroy, signal } from "@angular/core";

import {
  SocketService,
  type Unsubscribe,
} from "@vapour/services/socket.service";
import type { NotificationItem } from "@vapour/shared/kodi/notifications";
import type {
  GetActivePlayers,
  GetPlayerItem,
  GetPlayerItemQuery,
  GetPlayerProperties,
  GetPlayerPropertiesQuery,
  GetPlayers,
  GetPlayersQuery,
  MediaType,
  PlayerPlayPause,
  PlayerStop,
} from "@vapour/shared/kodi/player";

type PlayerInformation = {
  id: number;
  item?: NotificationItem;
  speed: number;
  state: "playing" | "paused" | "stopped";
};

@Injectable({ providedIn: "root" })
export class PlayerService implements OnDestroy {
  constructor(private socketService: SocketService) {
    this.#subscriptions.push(
      socketService.subscribe("Player.OnPlay", ({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          item: data.item,
          speed: data.player.speed,
          state: "playing",
        });
      }),
      socketService.subscribe("Player.OnPause", ({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          speed: data.player.speed,
          state: "paused",
        });
      }),
      socketService.subscribe("Player.OnResume", ({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          speed: data.player.speed,
          state: "playing",
        });
      }),
      socketService.subscribe("Player.OnStop", ({ data }) => {
        const players = { ...this.#playingInfo() };
        const id = data.item.id;

        if (id in players) {
          delete players[id];
          this.#playingInfo.set(players);
        }
      }),
    );
  }

  readonly #playingInfo = signal<Record<number, PlayerInformation>>({});
  readonly #subscriptions: Unsubscribe[] = [];

  readonly playing = computed(() => Object.values(this.#playingInfo()));

  ngOnDestroy(): void {
    this.#subscriptions.forEach((unsubscribe) => {
      unsubscribe();
    });
  }

  getActivePlayers(): Observable<GetActivePlayers> {
    return this.socketService.send<Record<string, never>, GetActivePlayers>(
      "Player.GetActivePlayers",
      {},
    );
  }

  getPlayers(media: MediaType = "all"): Observable<GetPlayers> {
    return this.socketService.send<GetPlayersQuery, GetPlayers>(
      "Player.GetPlayers",
      { media },
    );
  }

  getPlayerItem(id: number): Observable<GetPlayerItem> {
    return this.socketService.send<GetPlayerItemQuery, GetPlayerItem>(
      "Player.GetItem",
      {
        playerid: id,
        properties: [],
      },
    );
  }

  getPlayerProperties(id: number): Observable<GetPlayerProperties> {
    return this.socketService.send<
      GetPlayerPropertiesQuery,
      GetPlayerProperties
    >("Player.GetProperties", {
      properties: [
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
      ],
      playerid: id,
    });
  }

  stop(id: number): Observable<string> {
    return this.socketService.send<PlayerStop, string>("Player.Stop", {
      playerid: id,
    });
  }

  togglePlayPause(id: number): Observable<number> {
    return this.socketService.send<PlayerPlayPause, number>(
      "Player.PlayPause",
      {
        playerid: id,
      },
    );
  }

  #updatePlayer(id: number, data: Omit<PlayerInformation, "id">): void {
    const players = { ...this.#playingInfo() };

    if (id in players) {
      players[id] = {
        ...players[id],
        ...data,
      };
    } else {
      players[id] = { id, ...data };
    }

    this.#playingInfo.set(players);
  }
}
