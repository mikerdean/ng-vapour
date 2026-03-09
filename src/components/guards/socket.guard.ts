import { assertInInjectionContext, inject } from "@angular/core";
import { RedirectCommand, UrlTree } from "@angular/router";

import { SocketService } from "@vapour/services/socket.service";

const interval = 500;

export async function socketGuard(): Promise<
  boolean | UrlTree | RedirectCommand
> {
  assertInInjectionContext(socketGuard);

  const socketService = inject(SocketService);

  const isConnected = () => socketService.connectionState() === "connected";
  if (isConnected()) {
    return true;
  }

  let waited = 0;

  while (waited < 10_000) {
    await delay(interval);

    if (isConnected()) {
      return true;
    }

    waited += interval;
  }

  return false;
}

function delay(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
