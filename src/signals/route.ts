import { assertInInjectionContext, inject, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute, type Params } from "@angular/router";
import { map } from "rxjs";
import { parse, type GenericSchema, type InferOutput } from "valibot";

export function routeParams<TInput, TOutput>(
  schema: GenericSchema<TInput, TOutput>,
): Signal<InferOutput<typeof schema>> {
  assertInInjectionContext(routeParams);

  const route = inject(ActivatedRoute);

  return toSignal(
    route.params.pipe(map((params: Params) => parse(schema, params))),
    { requireSync: true },
  );
}

export function routeQuery<TInput, TOutput>(
  schema: GenericSchema<TInput, TOutput>,
): Signal<InferOutput<typeof schema>> {
  assertInInjectionContext(routeQuery);

  const route = inject(ActivatedRoute);

  return toSignal(
    route.queryParams.pipe(map((params: Params) => parse(schema, params))),
    { requireSync: true },
  );
}
