import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, SubscriptionLike } from "rxjs";

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

type PlayingInformation = {
  id?: number;
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
        const info: PlayingInformation = {
          ...this.#playingInfo$.value,
          id: data.player.playerid,
          speed: data.player.speed,
          state: "playing",
        };

        this.#playingInfo$.next(info);
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnPause").subscribe(({ data }) => {
        const info: PlayingInformation = {
          ...this.#playingInfo$.value,
          id: data.player.playerid,
          speed: data.player.speed,
          state: "paused",
        };

        this.#playingInfo$.next(info);
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnResume").subscribe(({ data }) => {
        const info: PlayingInformation = {
          ...this.#playingInfo$.value,
          id: data.player.playerid,
          speed: data.player.speed,
          state: "playing",
        };

        this.#playingInfo$.next(info);
      }),
    );

    this.#subscriptions.push(
      socketService.observe("Player.OnStop").subscribe(() => {
        const info: PlayingInformation = {
          ...this.#playingInfo$.value,
          id: undefined,
          item: undefined,
          state: "stopped",
        };

        this.#playingInfo$.next(info);
      }),
    );
  }

  readonly #playingInfo$ = new BehaviorSubject<PlayingInformation>({
    speed: 1,
    state: "stopped",
  });

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
      "Player.GetActivePlayers",
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
}
