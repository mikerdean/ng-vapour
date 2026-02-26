import { computed, inject, Injectable, OnDestroy, signal } from "@angular/core";
import type { InferOutput } from "valibot";

import type { notificationItem } from "@vapour/schema/notifications";
import { mediaType } from "@vapour/schema/player";
import {
  SocketService,
  type Unsubscribe,
} from "@vapour/services/socket.service";

type PlayerInformation = {
  id: number;
  item?: InferOutput<typeof notificationItem>;
  speed: number;
  state: "playing" | "paused" | "stopped";
};

function isMapEqual<K, V>(prev: Map<K, V>, next: Map<K, V>): boolean {
  if (prev.size !== next.size) {
    return false;
  }

  for (const [key, value] of prev.entries()) {
    if (!next.has(key)) {
      return false;
    }

    if (!Object.is(value, next.get(key))) {
      return false;
    }
  }

  for (const [key, value] of next.entries()) {
    if (!prev.has(key)) {
      return false;
    }

    if (!Object.is(value, prev.get(key))) {
      return false;
    }
  }

  return true;
}

@Injectable({ providedIn: "root" })
export class PlayerService implements OnDestroy {
  readonly #socketService = inject(SocketService);

  readonly #playingInfo = signal<Map<number, PlayerInformation>>(new Map(), {
    equal: isMapEqual,
  });

  readonly #subscriptions: Unsubscribe[] = [
    this.#socketService.subscribe("Player.OnPlay", ({ data }) => {
      this.#updatePlayer(data.player.playerid, {
        item: data.item,
        speed: data.player.speed,
        state: "playing",
      });
    }),
    this.#socketService.subscribe("Player.OnPause", ({ data }) => {
      this.#updatePlayer(data.player.playerid, {
        speed: data.player.speed,
        state: "paused",
      });
    }),
    this.#socketService.subscribe("Player.OnResume", ({ data }) => {
      this.#updatePlayer(data.player.playerid, {
        speed: data.player.speed,
        state: "playing",
      });
    }),
    this.#socketService.subscribe("Player.OnStop", ({ data }) => {
      const players = this.#playingInfo();
      const id = data.item.id;

      if (id in players) {
        players.delete(id);
        this.#playingInfo.set(players);
      }
    }),
  ];

  readonly playing = computed(() => [...this.#playingInfo().values()]);

  getActivePlayers() {
    return this.#socketService.send("Player.GetActivePlayers", {});
  }

  getPlayers(media: InferOutput<typeof mediaType> = "all") {
    return this.#socketService.send("Player.GetPlayers", { media });
  }

  getItem(id: number) {
    return this.#socketService.send("Player.GetItem", {
      playerid: id,
      properties: [],
    });
  }

  getProperties(id: number) {
    return this.#socketService.send("Player.GetProperties", {
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

  stop(id: number) {
    return this.#socketService.send("Player.Stop", {
      playerid: id,
    });
  }

  togglePlayPause(id: number) {
    return this.#socketService.send("Player.PlayPause", {
      playerid: id,
    });
  }

  #updatePlayer(id: number, data: Omit<PlayerInformation, "id">): void {
    const players = this.#playingInfo();

    players.set(id, {
      ...data,
      id,
    });

    this.#playingInfo.set(players);
  }

  ngOnDestroy(): void {
    this.#subscriptions.forEach((unsubscribe) => {
      unsubscribe();
    });
  }
}
