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

export const prepareGrid = <TInput, TOutput, UInput, UOutput extends GridQuery>(
  paramsSchema: GenericSchema<TInput, TOutput>,
  queryParamsSchema: GenericSchema<UInput, UOutput>,
  route: ActivatedRoute,
  expectedItems: number,
  query: (params: TOutput, queryParams: UOutput) => Observable<GridData>,
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
