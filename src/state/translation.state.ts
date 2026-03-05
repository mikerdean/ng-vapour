import { Injectable, signal } from "@angular/core";
import { createInstance, type i18n, type TFunction } from "i18next";
import HttpBackend from "i18next-http-backend";

@Injectable({ providedIn: "root" })
export class TranslationState {
  readonly #i18n: i18n;
  readonly #t = signal<TFunction | null>(null);

  readonly t = this.#t.asReadonly();

  constructor() {
    const i18n = createInstance({
      backend: {
        loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
      },
      fallbackLng: "en",
      lng: "en",
    });

    i18n.use(HttpBackend);

    void i18n.init((err, t) => {
      if (err) {
        this.#t.set(null);
      } else {
        this.#t.set(t);
      }
    });

    this.#i18n = i18n;
  }

  async changeLanguage(lng: string): Promise<void> {
    try {
      const t = await this.#i18n.changeLanguage(lng);
      this.#t.set(t);
    } catch {
      this.#t.set(null);
    }
  }
}
