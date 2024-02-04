import { Injectable, type OnDestroy } from "@angular/core";
import { nanoid } from "nanoid";
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  Subscription,
  throwError,
  timeout,
} from "rxjs";

import {
  isKodiError,
  isKodiNotification,
  isKodiResponse,
  type KodiMessageBase,
} from "../shared/kodi";
import { HostService } from "./host.service";
import type { ConnectionState } from "./socket.service.types";

@Injectable({ providedIn: "root" })
export class SocketService implements OnDestroy {
  readonly #connectionState = new BehaviorSubject<ConnectionState>(
    "connecting",
  );

  #hostSubscription: Subscription;
  #queue = new Map<string, Subject<KodiMessageBase>>();
  #socket: WebSocket | undefined;

  readonly connectionState$ = this.#connectionState.asObservable();
  readonly timeout = 5000;

  constructor(hostService: HostService) {
    this.#hostSubscription = hostService.websocketUrl$.subscribe((url) => {
      if (this.#socket) {
        this.#socket.close();
      }

      if (!url) {
        return;
      }

      const socket = new WebSocket(url);
      this.#connectionState.next("connecting");

      socket.onmessage = (ev: MessageEvent) => {
        try {
          const message = JSON.parse(ev.data);
          if (isKodiResponse(message) || isKodiError(message)) {
            const subject = this.#queue.get(message.id);
            if (subject) {
              subject.next(message);
              subject.complete();
              this.#queue.delete(message.id);
            }
          }

          if (isKodiNotification(message)) {
            // do something good here
          }
        } catch (err) {
          // log this here
        }
      };

      socket.onopen = () => {
        this.#connectionState.next("connected");
      };

      socket.onclose = () => {
        setTimeout(() => {
          this.#connectionState.next("disconnected");
          this.#socket = undefined;
        }, 250);
      };

      this.#socket = socket;
    });
  }

  ngOnDestroy(): void {
    this.#hostSubscription.unsubscribe();
  }

  send<TParams, TResponse>(
    method: string,
    params: TParams,
  ): Observable<TResponse> {
    const socket = this.#socket;

    if (!socket) {
      return throwError(() =>
        Error("Socket not currently connected. Command failed."),
      );
    }

    const id = nanoid();
    const subject = new Subject<KodiMessageBase>();
    this.#queue.set(id, subject);

    socket.send(
      JSON.stringify({
        id,
        jsonrpc: "2.0",
        method,
        params,
      }),
    );

    return subject.pipe(
      timeout({
        each: this.timeout,
        with: () => {
          this.#queue.delete(id);
          return throwError(() =>
            Error(`Message ${id} exceeded the timeout value (${timeout})`),
          );
        },
      }),
      map((message) => {
        if (isKodiError(message)) {
          throw Error(
            `Message ${id} response returned an error from JSONRPC: ${message.error.message}`,
          );
        } else if (isKodiResponse<TResponse>(message)) {
          return message.result;
        }

        throw Error(`Message ${id} response could not be processed.`);
      }),
    );
  }
}
