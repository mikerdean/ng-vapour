import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { HostService } from "./host.service";
import type { ConnectionState } from "./socket.service.types";

@Injectable({ providedIn: "root" })
export class SocketService {
  #connectionState = new BehaviorSubject<ConnectionState>("connecting");
  #socket: WebSocket | undefined;

  connectionState$ = this.#connectionState.asObservable();

  constructor(hostService: HostService) {
    hostService.websocketUrl$.subscribe((url) => {
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
}
