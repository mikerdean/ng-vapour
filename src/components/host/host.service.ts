import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Subject } from "rxjs";

import type { Host } from "./host.service.types";

@Injectable({ providedIn: "root" })
export class HostService {
  #host: Subject<Host | undefined> = new BehaviorSubject<Host | undefined>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  host$ = this.#host.asObservable();

  httpUrl$ = this.host$.pipe(
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

  websocketUrl$ = this.host$.pipe(
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

  update(host: Host): void {
    this.#host.next(host);
  }
}
