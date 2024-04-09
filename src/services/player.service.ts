import { Injectable, OnDestroy } from "@angular/core";
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  SubscriptionLike,
  switchMap,
} from "rxjs";

import type { ThumbnailType } from "@vapour/components/images/thumbnail.types";
import { SocketService } from "@vapour/services/socket.service";
import type {
  GetActivePlayers,
  GetPlayerItem,
  GetPlayerItemQuery,
  GetPlayers,
  GetPlayersQuery,
  MediaType,
} from "@vapour/shared/kodi";

type NowPlayingItemMetadata = {
  title: string;
  value?: string;
};

type PlayerInformation = {
  id: number;
  item?: {
    id: number;
    backgroundUrl?: string;
    metadata: NowPlayingItemMetadata[];
    thumbnailUrl?: string;
    title: string;
    type: ThumbnailType;
  };
  speed: number;
  state: "playing" | "paused" | "stopped";
};

@Injectable({ providedIn: "root" })
export class PlayerService implements OnDestroy {
  constructor(private socketService: SocketService) {
    this.#subscriptions.push(
      socketService.observe("Player.OnPlay").subscribe(({ data }) => {
        this.#updatePlayer(data.player.playerid, {
          item: {
            id: data.item.id,
            metadata: [],
            title: "test",
            type: data.item.type as ThumbnailType,
          },
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
          forkJoin(
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
            item: {
              id: item.id,
              title: "some title",
              metadata: [],
              type: item.type as ThumbnailType,
            },
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
