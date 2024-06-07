import { ActivatedRoute } from "@angular/router";
import {
  combineLatest,
  concatWith,
  map,
  Observable,
  of,
  switchMap,
  takeUntil,
} from "rxjs";
import { parse, type GenericSchema } from "valibot";

import type { GridData, GridQuery } from "@vapour/components/grid/grid.types";

export const prepareGrid = <T, U extends GridQuery>(
  paramsSchema: GenericSchema<T>,
  queryParamsSchema: GenericSchema<U>,
  route: ActivatedRoute,
  expectedItems: number,
  query: (params: T, queryParams: U) => Observable<GridData>,
) =>
  combineLatest([route.params, route.queryParams]).pipe(
    map(([params, queryParams]) => ({
      params: parse(paramsSchema, params),
      queryParams: parse(queryParamsSchema, queryParams),
    })),
    switchMap(({ params, queryParams }, i) => {
      const { page } = queryParams;
      const gridData = query(params, queryParams);
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
