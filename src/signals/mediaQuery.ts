import { effect, signal, type Signal } from "@angular/core";

export function mediaQuery(query: string): Signal<boolean> {
  const matchMedia = window.matchMedia(query);
  const mediaQuerySignal = signal(matchMedia.matches);

  const listener = (ev: MediaQueryListEvent): void => {
    mediaQuerySignal.set(ev.matches);
  };

  matchMedia.addEventListener("change", listener);

  effect((onCleanup) => {
    onCleanup(() => {
      matchMedia.removeEventListener("change", listener);
    });
  });

  return mediaQuerySignal.asReadonly();
}
