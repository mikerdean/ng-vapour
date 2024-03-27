import { combineLatest, delay, map, Observable, of, switchMap } from "rxjs";

export const toImageUrl = (
  baseUrl: Observable<string | undefined>,
  imageUri: Observable<string | undefined>,
): Observable<string | undefined> =>
  combineLatest([
    baseUrl,
    imageUri.pipe(
      switchMap((uri, i) => {
        if (i === 0) {
          return of(uri);
        } else {
          return of(undefined, uri).pipe(delay(25));
        }
      }),
    ),
  ]).pipe(
    map(([baseUrl, uri]) => {
      if (!baseUrl || !uri) {
        return;
      }

      const encoded = encodeURIComponent(uri);
      const url = new URL(`image/${encoded}`, baseUrl);
      return url.toString();
    }),
  );
