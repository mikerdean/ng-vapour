import {
  array,
  boolean,
  integer,
  literal,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
  string,
  union,
  unknown,
  type InferOutput,
} from "valibot";

import { int } from "./utils";

export const jsonRpc = object({
  jsonrpc: literal("2.0"),
});

export type JsonRpc = InferOutput<typeof jsonRpc>;

export const jsonRpcWithId = object({
  id: string(),
});

export const jsonRpcRequest = object({
  ...jsonRpc.entries,
  ...jsonRpcWithId.entries,
  method: string(),
  params: unknown(),
});

export const jsonRpcNotification = object({
  ...jsonRpc.entries,
  method: string(),
  params: unknown(),
});

export type JsonRpcRequest = InferOutput<typeof jsonRpcRequest>;

export const jsonRpcResponse = object({
  ...jsonRpc.entries,
  ...jsonRpcWithId.entries,
  result: unknown(),
});

export const jsonRpcError = object({
  code: pipe(number(), integer()),
  data: unknown(),
  message: string(),
});

export const jsonRpcErrorResponse = object({
  ...jsonRpc.entries,
  ...jsonRpcWithId.entries,
  error: jsonRpcError,
});

export const kodiLimits = object({
  start: optional(pipe(number(), integer())),
  end: optional(pipe(number(), integer())),
});

export const kodiLimitsWithTotal = object({
  ...kodiLimits.entries,
  total: pipe(number(), integer()),
});

export const kodiSort = object({
  ignorearticle: optional(boolean()),
  method: optional(string()),
  order: optional(union([literal("ascending"), literal("descending")])),
  useartistsortname: optional(boolean()),
});

export const kodiFilter = object({
  field: string(),
  operator: string(),
  value: union([string(), array(string())]),
});

export type KodiFilter = InferOutput<typeof kodiFilter>;

export const kodiAndFilter = object({
  and: array(kodiFilter),
});

export const kodiOrFilter = object({
  or: array(kodiFilter),
});

export const kodiFilters = union([kodiFilter, kodiAndFilter, kodiOrFilter]);

export const itemDetailsBase = object({
  label: string(),
});

export const mediaArtwork = object({
  banner: optional(string()),
  fanart: optional(string()),
  poster: optional(string()),
  thumb: optional(string()),
});

export const mediaDetailsBase = object({
  ...itemDetailsBase.entries,
  fanart: optional(string()),
  thumbnail: optional(string()),
});

export const time = object({
  hours: int(),
  milliseconds: pipe(number(), minValue(0), maxValue(999), integer()),
  minutes: pipe(number(), minValue(0), maxValue(59), integer()),
  seconds: pipe(number(), minValue(0), maxValue(59), integer()),
});

export type Time = InferOutput<typeof time>;
