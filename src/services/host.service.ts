import { computed, Injectable, signal } from "@angular/core";

export type Host = {
  hostname: string;
  httpPort: number;
  tcpPort: number;
};

@Injectable({ providedIn: "root" })
export class HostService {
  readonly #host = signal<Host | undefined>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  readonly host = computed(() => this.#host());

  readonly httpUrl = computed(() => {
    const host = this.#host();
    if (!host) {
      return undefined;
    }

    const { hostname, httpPort } = host;
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}:${httpPort.toString()}`;
  });

  readonly websocketUrl = computed(() => {
    const host = this.#host();
    if (!host) {
      return undefined;
    }

    const { hostname, tcpPort } = host;
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${hostname}:${tcpPort.toString()}`;
  });

  clear(): void {
    this.#host.set(undefined);
  }

  update(host: Host): void {
    this.#host.set(host);
  }
}
