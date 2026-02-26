import {
  array,
  integer,
  keyof,
  minValue,
  number,
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

export const int = () => pipe(number(), integer());

export const id = () => pipe(number(), integer(), minValue(1));

export function properties<
  TEntries extends ObjectEntries,
  const TSchema extends ObjectSchema<TEntries, undefined>,
  const TKeys extends ObjectKeys<TSchema>,
>(schema: TSchema, props: TKeys) {
  return pipe(array(keyof(pick(schema, props))), distinct());
}
