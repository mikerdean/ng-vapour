import {
  assertInInjectionContext,
  computed,
  inject,
  Signal,
} from "@angular/core";
import type { ParseKeys, TOptions } from "i18next";

import { TranslationState } from "@vapour/state/translation.state";

type TranslationInput = Record<string, ParseKeys | [ParseKeys, () => TOptions]>;

type TranslationOutput<T> = {
  [Property in keyof T]: Signal<string>;
};

export function translate<T extends TranslationInput>(
  translations: T,
): TranslationOutput<T> {
  const output: Record<string, Signal<string>> = {};

  for (const [key, translation] of Object.entries(translations)) {
    const isString = typeof translation === "string";
    const translationKey = isString ? translation : translation[0];
    const options = isString ? undefined : translation[1];

    output[key] = translateOne(translationKey, options);
  }

  return output as TranslationOutput<T>;
}

export function translateOne(
  key: ParseKeys,
  options?: () => TOptions,
): Signal<string> {
  assertInInjectionContext(translateOne);

  const translationState = inject(TranslationState);

  const signal = computed(() => {
    const t = translationState.t();
    const unwrappedOptions = options ? options() : undefined;

    if (!t) {
      return "__translation_failed__";
    }

    return t(key, unwrappedOptions);
  });

  return signal;
}
