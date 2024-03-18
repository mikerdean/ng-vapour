import type { ApplicationConfig } from "@angular/core";
import {
  provideRouter,
  TitleStrategy,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "@vapour/components/app.routes";
import { TranslatedTitleStrategy } from "@vapour/strategies/translatedTitleStrategy";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" }),
    ),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
  ],
};
