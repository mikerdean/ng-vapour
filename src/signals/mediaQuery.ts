import { assertInInjectionContext, signal, type Signal } from "@angular/core";

export function mediaQuery(query: string): Signal<boolean> {
  assertInInjectionContext(mediaQuery);

  const matchMedia = window.matchMedia(query);
  const mediaQuerySignal = signal(matchMedia.matches);

  matchMedia.addEventListener("change", (ev) => {
    mediaQuerySignal.set(ev.matches);
  });

  return mediaQuerySignal.asReadonly();
}
