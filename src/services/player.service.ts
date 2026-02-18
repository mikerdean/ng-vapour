import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  SubscriptionLike,
  switchMap,
} from "rxjs";

import { SocketService } from "@vapour/services/socket.service";
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
      socketService.observe("Player.OnPlay").subscribe(({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          item: data.item,
          speed: data.player.speed,
          state: "playing",
        });
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnPause").subscribe(({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          speed: data.player.speed,
          state: "paused",
        });
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnResume").subscribe(({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          speed: data.player.speed,
          state: "playing",
        });
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnStop").subscribe(({ data }) => {
        const players = [...this.#playingInfo$.value];
        const idx = players.findIndex(
          (player) => player.item?.id === data.item.id,
        );

        if (idx > -1) {
          players.splice(idx, 1);
          this.#playingInfo$.next(players);
        }
      }),
    );

    this.getActivePlayers()
      .pipe(
        switchMap((players) =>
          combineLatest(
            players.map((player) =>
              this.getPlayerItem(player.playerid).pipe(
                map(({ item }) => ({ player, item })),
              ),
            ),
          ),
        ),
      )
      .forEach((players) => {
        this.#playingInfo$.next(
          players.map(({ player, item }) => ({
            id: player.playerid,
            item,
            speed: 1,
            state: "playing",
          })),
        );
      });
  }

  readonly #playingInfo$ = new BehaviorSubject<PlayerInformation[]>([]);

  readonly #subscriptions: SubscriptionLike[] = [];

  readonly playing$ = this.#playingInfo$.asObservable();

  ngOnDestroy(): void {
    this.#subscriptions.forEach((sub) => sub.unsubscribe());
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
    const players = [...this.#playingInfo$.value];

    const idx = players.findIndex((info) => info.id === id);
    if (idx < 0) {
      players.push({ id, ...data });
    } else {
      players[idx] = {
        ...players[idx],
        ...data,
      };
    }

    this.#playingInfo$.next(players);
  }
}
