import { ActivatedRoute } from "@angular/router";
import {
  concatWith,
  debounceTime,
  map,
  Observable,
  of,
  switchMap,
  takeUntil,
} from "rxjs";

import type { GridData } from "./grid.types";

export const prepareGrid = (
  route: ActivatedRoute,
  expectedItems: number,
  query: (page: number) => Observable<GridData>,
) =>
  route.queryParams.pipe(
    debounceTime(25),
    map((query) => {
      const queryPage = parseInt(query["page"], 10);
      return queryPage || 1;
    }),
    switchMap((page, i) => {
      const gridData = query(page);
      const firstTime = i === 0;

      if (firstTime) {
        return of<GridData>({
          currentPage: 1,
          items: Array.from({ length: expectedItems }, () => null),
        }).pipe(takeUntil(gridData), concatWith(gridData));
      }

      return gridData;
    }),
  );
