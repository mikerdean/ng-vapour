import { Injectable } from "@angular/core";
import { BaseIssue, BaseSchema, InferOutput, safeParse } from "valibot";

type Cached = {
  expires: number;
  value: unknown;
};

const SIXTY_SECONDS = 60_000;

@Injectable({ providedIn: "root" })
export class CachingService {
  readonly #cache = new Map<string, Cached>();

  get<TInput, TOutput>(
    key: string,
    schema: BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
  ): InferOutput<typeof schema> | undefined {
    const cached = this.#cache.get(key);
    if (!cached) {
      return undefined;
    }

    if (cached.expires <= Date.now()) {
      this.#cache.delete(key);
      return undefined;
    }

    const result = safeParse(schema, cached.value);
    if (result.success) {
      return result.output;
    }

    return undefined;
  }

  set(key: string, value: unknown, cacheLengthMs = SIXTY_SECONDS): void {
    this.#cache.set(key, { value, expires: Date.now() + cacheLengthMs });
  }
}
