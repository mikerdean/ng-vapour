import {
  array,
  keyof,
  pick,
  pipe,
  transform,
  type ObjectEntries,
  type ObjectKeys,
  type ObjectSchema,
  type TransformAction,
} from "valibot";

export function distinct<T>(): TransformAction<T[], T[]> {
  return transform<T[], T[]>((input) => {
    const set = new Set<T>(input);
    return [...set];
  });
}

export function properties<
  TEntries extends ObjectEntries,
  const TSchema extends ObjectSchema<TEntries, undefined>,
  const TKeys extends ObjectKeys<TSchema>,
>(schema: TSchema, props: TKeys) {
  return pipe(array(keyof(pick(schema, props))), distinct());
}
