import { computed, inject, Injectable, signal } from "@angular/core";
import { Title } from "@angular/platform-browser";
import type { TOptions } from "i18next";
import { firstValueFrom } from "rxjs";

import { TranslationService } from "@vapour/services/translation.service";

@Injectable({ providedIn: "root" })
export class TitleService {
  readonly #translationService = inject(TranslationService);
  readonly #windowTitle = inject(Title);

  readonly #title = signal<string | undefined>(undefined);
  readonly title = computed(() => this.#title());

  async setTranslatedTitle(key: string, options?: TOptions): Promise<void> {
    const pageTitle = await firstValueFrom(
      this.#translationService.translate(key, options),
    );

    await this.setRawTitle(pageTitle);
  }

  async setRawTitle(pageTitle: string | null): Promise<void> {
    if (pageTitle) {
      const fullTitle = await firstValueFrom(
        this.#translationService.translate("common:pageTitle.combined", {
          pageTitle,
        }),
      );

      this.#windowTitle.setTitle(fullTitle);
      this.#title.set(pageTitle);
    } else {
      const defaultTitle = await firstValueFrom(
        this.#translationService.translate("common:pageTitle.main"),
      );

      this.#windowTitle.setTitle(defaultTitle);
      this.#title.set(undefined);
    }
  }
}
