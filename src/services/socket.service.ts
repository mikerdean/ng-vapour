import { Injectable, type OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { HostService } from "./host.service";
import type { ConnectionState } from "./socket.service.types";

@Injectable({ providedIn: "root" })
export class SocketService implements OnDestroy {
  #connectionState = new BehaviorSubject<ConnectionState>("connecting");
  #hostSubscription: Subscription;
  #socket: WebSocket | undefined;

  readonly connectionState$ = this.#connectionState.asObservable();

  constructor(hostService: HostService) {
    this.#hostSubscription = hostService.websocketUrl$.subscribe((url) => {
      if (this.#socket) {
        this.#socket.close();
      }

      if (!url) {
        return;
      }

      this.#socket = new WebSocket(url);
      this.#connectionState.next("connecting");

      this.#socket.onopen = () => {
        this.#connectionState.next("connected");
      };

      this.#socket.onclose = () => {
        setTimeout(() => {
          this.#connectionState.next("disconnected");
          this.#socket = undefined;
        }, 250);
      };
    });
  }

  ngOnDestroy(): void {
    this.#hostSubscription.unsubscribe();
  }
}
