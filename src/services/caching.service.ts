/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */

import { Injectable } from "@angular/core";

type Cached = {
  expires: number;
  value: unknown;
};

const SIXTY_SECONDS = 60_000;

@Injectable({ providedIn: "root" })
export class CachingService {
  readonly #cache = new Map<string, Cached>();

  get<T>(key: string): T | undefined {
    const cached = this.#cache.get(key);
    if (cached === undefined) {
      return undefined;
    }

    if (cached.expires <= Date.now()) {
      this.#cache.delete(key);
      return undefined;
    }

    return cached.value as T;
  }

  key<T>(value: T): string {
    const ordered = this.#reorder(value);
    return JSON.stringify(ordered);
  }

  set<T>(key: string, value: T): void {
    this.#cache.set(key, { value, expires: Date.now() + SIXTY_SECONDS });
  }

  #reorder(value: unknown): unknown {
    if (this.#isPrimitive(value)) {
      return value;
    }

    if (this.#isPlainObject(value)) {
      const keys = Object.keys(value).sort();
      const reordered: Record<string, unknown> = {};

      for (const key of keys) {
        reordered[key] = this.#reorder(value[key]);
      }

      return reordered;
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.#reorder(item));
    }

    return undefined;
  }

  #isPrimitive(value: unknown): boolean {
    return (
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "number"
    );
  }

  #isPlainObject(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === "object" && value.constructor === Object;
  }
}
