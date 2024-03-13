import { ActivatedRoute } from "@angular/router";
import { concatWith, map, Observable, of, switchMap, takeUntil } from "rxjs";

import type { GridData } from "./grid.types";

export const prepareGrid = (
  route: ActivatedRoute,
  expectedItems: number,
  query: (page: number) => Observable<GridData>,
) =>
  route.queryParams.pipe(
    map((query) => {
      const queryPage = parseInt(query["page"], 10);
      return queryPage || 1;
    }),
    switchMap((page, i) => {
      const gridData = query(page);
      const firstTime = i === 0;

      if (firstTime) {
        return of<GridData>({
          currentPage: page,
          items: Array.from({ length: expectedItems }, () => null),
          limits: { total: expectedItems },
        }).pipe(takeUntil(gridData), concatWith(gridData));
      }

      return gridData;
    }),
  );
