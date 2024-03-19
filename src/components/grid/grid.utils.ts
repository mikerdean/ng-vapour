import { ActivatedRoute } from "@angular/router";
import { concatWith, map, Observable, of, switchMap, takeUntil } from "rxjs";
import { parse, type BaseSchema } from "valibot";

import type { GridData, GridQuery } from "@vapour/components/grid/grid.types";

export const prepareGrid = <T extends GridQuery>(
  schema: BaseSchema<T>,
  route: ActivatedRoute,
  expectedItems: number,
  query: (queryParams: T) => Observable<GridData>,
) =>
  route.queryParams.pipe(
    map((queryParams) => parse(schema, queryParams)),
    switchMap((queryParams, i) => {
      const { page } = queryParams;
      const gridData = query(queryParams);
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
