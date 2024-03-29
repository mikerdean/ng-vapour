import { fromEvent, map, mergeWith, Observable, of } from "rxjs";

export const fromMediaQuery = (query: string): Observable<boolean> => {
  const mediaQuery = window.matchMedia(query);

  return of(mediaQuery.matches).pipe(
    mergeWith(
      fromEvent<MediaQueryListEvent>(mediaQuery, "change").pipe(
        map((ev) => ev.matches),
      ),
    ),
  );
};
