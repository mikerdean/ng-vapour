import { computed, effect, Injectable, signal } from "@angular/core";
import { nanoid } from "nanoid";
import { map, Observable, of, Subject, throwError, timeout } from "rxjs";

import { CachingService } from "@vapour/services/caching.service";
import { HostService } from "@vapour/services/host.service";
import { LoggingService } from "@vapour/services/logging.service";
import { toError } from "@vapour/shared/error";
import { KodiMessageBase } from "@vapour/shared/kodi/message";
import { NotificationMap } from "@vapour/shared/kodi/notifications";
import {
  isKodiError,
  isKodiNotification,
  isKodiResponse,
} from "@vapour/shared/kodi/typeguards";

export type ConnectionState = "connected" | "connecting" | "disconnected";

@Injectable({ providedIn: "root" })
export class SocketService {
  #notifications = new Map<keyof NotificationMap, Set<Subject<unknown>>>();
  #queue = new Map<string, Subject<KodiMessageBase>>();
  #socket: WebSocket | undefined;

  readonly #attempts = signal(0);
  readonly #connectionState = signal<ConnectionState>("connecting");

  readonly connectionState = computed(() => this.#connectionState());
  readonly timeout = 5000;

  constructor(
    private cachingService: CachingService,
    private hostService: HostService,
    private loggingService: LoggingService,
  ) {
    effect(() => {
      const url = this.hostService.websocketUrl();
      this.#attempts();

      if (this.#socket) {
        this.#socket.close();
      }

      if (!url) {
        this.#connectionState.set("disconnected");
        return;
      }

      const socket = new WebSocket(url);
      this.#connectionState.set("connecting");

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
            const subjects = this.#notifications.get(message.method);
            if (subjects) {
              for (const subject of subjects) {
                if (subject.closed) {
                  subjects.delete(subject);
                  continue;
                }

                subject.next(message.params);
              }

              return;
            }
          }
        } catch (err: unknown) {
          this.loggingService.error(toError(err));
        }
      };

      socket.onopen = () => {
        this.#connectionState.set("connected");
      };

      socket.onclose = () => {
        setTimeout(() => {
          this.#connectionState.set("disconnected");
          this.#socket = undefined;
        }, 250);
      };

      this.#socket = socket;
    });
  }

  retry(): void {
    this.#attempts.update((i) => ++i);
  }

  observe<T extends keyof NotificationMap>(
    type: T,
  ): Observable<NotificationMap[T]> {
    const subject = new Subject<NotificationMap[T]>();

    let set = this.#notifications.get(type);
    if (!set) {
      set = new Set();
      this.#notifications.set(type, set);
    }

    set.add(subject as Subject<unknown>);

    return subject.asObservable();
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

    const key = this.cachingService.key(params);
    const cached = this.cachingService.get<TResponse>(key);
    if (cached !== undefined) {
      return of(cached);
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
          this.cachingService.set(key, message.result);
          return message.result;
        }

        throw Error(`Message ${id} response could not be processed.`);
      }),
    );
  }
}
