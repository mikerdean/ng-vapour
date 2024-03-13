import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

import { Host } from "@vapour/services/host.service.types";

@Injectable({ providedIn: "root" })
export class HostService {
  readonly #host = new BehaviorSubject<Host | undefined>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  readonly host$ = this.#host.asObservable();

  readonly httpUrl$ = this.#host.pipe(
    map((host) => {
      if (!host) {
        return undefined;
      }

      const { hostname, httpPort } = host;
      const protocol = window.location.protocol;
      const url = new URL(`${protocol}//${hostname}:${httpPort}`);
      return url.toString();
    }),
  );

  readonly websocketUrl$ = this.#host.pipe(
    map((host) => {
      if (!host) {
        return undefined;
      }

      const { hostname, tcpPort } = host;
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const url = new URL(`${protocol}://${hostname}:${tcpPort}`);
      return url.toString();
    }),
  );

  clear(): void {
    this.#host.next(undefined);
  }

  retry(): void {
    const host = this.#host.value;
    if (host) {
      this.update({ ...host });
    }
  }

  update(host: Host): void {
    this.#host.next(host);
  }
}
