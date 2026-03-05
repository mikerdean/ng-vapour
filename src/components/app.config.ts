import {
  provideZonelessChangeDetection,
  type ApplicationConfig,
} from "@angular/core";
import {
  provideRouter,
  TitleStrategy,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "@vapour/components/app.routes";
import { TranslatedTitleStrategy } from "@vapour/strategy/translatedTitleStrategy";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" }),
    ),
    provideZonelessChangeDetection(),
    {
      provide: TitleStrategy,
      useClass: TranslatedTitleStrategy,
    },
  ],
};
