import type { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  TitleStrategy,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

import { KodiTitleStrategy } from "../strategies/kodiTitleStrategy";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" }),
    ),
    { provide: TitleStrategy, useClass: KodiTitleStrategy },
  ],
};
