import {
  provideZonelessChangeDetection,
  type ApplicationConfig,
} from "@angular/core";
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
} from "@angular/router";

import { routes } from "@vapour/components/app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" }),
    ),
    provideZonelessChangeDetection(),
  ],
};
