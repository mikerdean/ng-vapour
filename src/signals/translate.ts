import {
  assertInInjectionContext,
  computed,
  inject,
  Signal,
} from "@angular/core";
import type { ParseKeys, TOptions } from "i18next";

import { TranslationState } from "@vapour/state/translation.state";

type TranslationInput = Record<string, ParseKeys | [ParseKeys, TOptions]>;

type TranslationOutput<T> = {
  [Property in keyof T]: Signal<string>;
};

export function translate<T extends TranslationInput>(
  translations: T,
): TranslationOutput<T> {
  assertInInjectionContext(translate);

  const translationState = inject(TranslationState);

  const output: Record<string, Signal<string>> = {};

  for (const [key, translation] of Object.entries(translations)) {
    const tkey = typeof translation === "string" ? translation : translation[0];

    const options =
      typeof translation === "string" ? undefined : translation[1];

    const signal = computed(() => {
      const t = translationState.t();
      if (!t) {
        return "__translation_failed__";
      }

      return t(tkey, options);
    });

    output[key] = signal;
  }

  return output as TranslationOutput<T>;
}
