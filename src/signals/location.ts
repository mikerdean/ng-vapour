import { Location } from "@angular/common";
import {
  assertInInjectionContext,
  inject,
  signal,
  type Signal,
} from "@angular/core";

export function locationPath(): Signal<string> {
  assertInInjectionContext(locationPath);

  const location = inject(Location);
  const locationSignal = signal(location.path());

  location.onUrlChange(() => {
    locationSignal.set(location.path());
  });

  return locationSignal.asReadonly();
}
