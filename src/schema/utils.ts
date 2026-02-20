import {
  object,
  transform,
  type BaseIssue,
  type BaseSchema,
  type TransformAction,
} from "valibot";

import { jsonRpcRequest, jsonRpcResponse } from "./base";

export function createRequest<TInput, TOutput>(
  params: BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
) {
  return object({
    ...jsonRpcRequest.entries,
    params,
  });
}

export function createResponse<TInput, TOutput>(
  result: BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
) {
  return object({
    ...jsonRpcResponse.entries,
    result,
  });
}

export function distinct<T>(): TransformAction<T[], T[]> {
  return transform<T[], T[]>((input) => {
    const set = new Set<T>(input);
    return [...set];
  });
}
