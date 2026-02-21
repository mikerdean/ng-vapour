import { computed, effect, Injectable, signal } from "@angular/core";
import { nanoid } from "nanoid";
import {
  is,
  object,
  safeParse,
  type BaseIssue,
  type BaseSchema,
  type InferOutput,
} from "valibot";

import {
  jsonRpc,
  jsonRpcErrorResponse,
  jsonRpcRequest,
  jsonRpcResponse,
  jsonRpcWithId,
  type JsonRpc,
  type JsonRpcRequest,
} from "@vapour/schema/base";
import {
  notifications,
  type NotificationEvents,
} from "@vapour/schema/notifications";
import { HostService } from "@vapour/services/host.service";
import { LoggingService } from "@vapour/services/logging.service";
import { toError } from "@vapour/shared/error";

export type ConnectionState = "connected" | "connecting" | "disconnected";
export type JsonRpcListener = (message: JsonRpc) => void;
export type EventRpcListener = (message: unknown) => void;
export type Unsubscribe = () => void;

@Injectable({ providedIn: "root" })
export class SocketService {
  #notifications = new Map<keyof NotificationEvents, Set<EventRpcListener>>();
  #queue = new Map<string, JsonRpcListener>();
  #socket: WebSocket | undefined;

  readonly #attempts = signal(0);
  readonly #connectionState = signal<ConnectionState>("connecting");

  readonly connectionState = computed(() => this.#connectionState());
  readonly timeout = 5000;

  constructor(
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
        if (typeof ev.data !== "string") {
          return;
        }

        try {
          const message: unknown = JSON.parse(ev.data);
          if (!is(jsonRpc, message)) {
            return;
          }

          if (is(jsonRpcWithId, message)) {
            const callback = this.#queue.get(message.id);
            if (callback) {
              callback(message);
              this.#queue.delete(message.id);
            }
          }

          const result = safeParse(notifications, message);
          if (!result.success) {
            return;
          }

          const listeners = this.#notifications.get(result.output.method);
          if (!listeners) {
            return;
          }

          for (const listener of listeners) {
            listener(result.output.params);
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
    this.#attempts.update((i) => i + 1);
  }

  send<TRequest, TResponse>(
    method: string,
    paramsSchema: BaseSchema<TRequest, TRequest, BaseIssue<unknown>>,
    responseSchema: BaseSchema<TResponse, TResponse, BaseIssue<unknown>>,
    params: InferOutput<typeof paramsSchema>,
  ): Promise<InferOutput<typeof responseSchema>> {
    return new Promise((resolve, reject) => {
      const socket = this.#socket;

      if (!socket) {
        reject(Error("Socket not currently connected. Command failed."));
        return;
      }

      const requestSchema = object({
        ...jsonRpcRequest.entries,
        params: paramsSchema,
      });

      const id = nanoid();

      const request: JsonRpcRequest = {
        id,
        jsonrpc: "2.0",
        method,
        params,
      };

      const requestResult = safeParse(requestSchema, request);
      if (!requestResult.success) {
        reject(Error("Request validation failed."));
        return;
      }

      this.#queue.set(id, (message) => {
        const responseSchemaWithResult = object({
          ...jsonRpcResponse.entries,
          result: responseSchema,
        });

        const responseResult = safeParse(responseSchemaWithResult, message);
        if (responseResult.success) {
          resolve(responseResult.output.result);
          return;
        }

        if (is(jsonRpcErrorResponse, message)) {
          reject(
            Error(
              `Request to kodi failed with the following message: ${message.error.message}`,
            ),
          );

          return;
        }

        reject(Error("Request to kodi failed with an unspecified error."));
      });

      socket.send(JSON.stringify(requestResult.output));
    });
  }

  subscribe<T extends keyof NotificationEvents>(
    method: T,
    listener: NotificationEvents[T],
  ): Unsubscribe {
    let set = this.#notifications.get(method);
    if (!set) {
      set = new Set();
      this.#notifications.set(method, set);
    }

    set.add(listener as EventRpcListener);

    return () => {
      const set = this.#notifications.get(method);
      if (!set) {
        return false;
      }

      return set.delete(listener as EventRpcListener);
    };
  }
}
