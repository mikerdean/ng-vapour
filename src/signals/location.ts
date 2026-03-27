import { Location } from "@angular/common";
import {
  assertInInjectionContext,
  effect,
  inject,
  signal,
  type Signal,
} from "@angular/core";

export function locationPath(): Signal<string> {
  assertInInjectionContext(locationPath);

  const location = inject(Location);
  const locationSignal = signal(location.path());

  const unsubscribe = location.onUrlChange(() => {
    locationSignal.set(location.path());
  });

  effect((onCleanup) => {
    onCleanup(unsubscribe);
  });

  return locationSignal.asReadonly();
}
