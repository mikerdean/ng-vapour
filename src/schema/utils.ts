import { object, type BaseIssue, type BaseSchema } from "valibot";
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
