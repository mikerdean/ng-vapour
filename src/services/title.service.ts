import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import type { TOptions } from "i18next";
import { BehaviorSubject, firstValueFrom } from "rxjs";

import { TranslationService } from "@vapour/services/translation.service";

@Injectable({ providedIn: "root" })
export class TitleService {
  constructor(
    private translationService: TranslationService,
    private windowTitle: Title,
  ) {}

  readonly #title = new BehaviorSubject<string | undefined>(undefined);
  readonly title$ = this.#title.asObservable();
  async setTranslatedTitle(key: string, options?: TOptions): Promise<void> {
    const pageTitle = await firstValueFrom(
      this.translationService.translate(key, options),
    );

    await this.setRawTitle(pageTitle);
  }

  async setRawTitle(pageTitle: string | null): Promise<void> {
    if (pageTitle) {
      const fullTitle = await firstValueFrom(
        this.translationService.translate("common:pageTitle.combined", {
          pageTitle,
        }),
      );

      this.windowTitle.setTitle(fullTitle);
      this.#title.next(pageTitle);
    } else {
      const defaultTitle = await firstValueFrom(
        this.translationService.translate("common:pageTitle.main"),
      );

      this.windowTitle.setTitle(defaultTitle);
      this.#title.next(undefined);
    }
  }
}
