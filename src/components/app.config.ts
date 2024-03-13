import type { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  TitleStrategy,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "@vapour/components/app.routes";
import { KodiTitleStrategy } from "@vapour/strategies/kodiTitleStrategy";

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
