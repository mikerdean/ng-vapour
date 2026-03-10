import { assertInInjectionContext, inject } from "@angular/core";
import { RedirectCommand, UrlTree } from "@angular/router";

import { SocketService } from "@vapour/services/socket.service";

export async function socketGuard(): Promise<
  boolean | UrlTree | RedirectCommand
> {
  assertInInjectionContext(socketGuard);

  const socketService = inject(SocketService);

  const isConnected = () => socketService.connectionState() === "connected";
  if (isConnected()) {
    return true;
  }

  let attempts = 0;

  while (attempts < 5) {
    await delay(500);

    if (isConnected()) {
      return true;
    }

    attempts += 1;
  }

  return false;
}

function delay(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
