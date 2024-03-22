import { Injectable } from "@angular/core";
import {
  createInstance,
  type i18n,
  type TFunction,
  type TOptions,
} from "i18next";
import HttpBackend from "i18next-http-backend";
import { map, Observable, ReplaySubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class TranslationService {
  private readonly i18n: i18n;
  private readonly t: ReplaySubject<TFunction>;

  constructor() {
    this.t = new ReplaySubject(1);

    const i18n = createInstance({
      backend: {
        loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
      },
      debug: true,
      defaultNS: "components",
      fallbackLng: "en",
      fallbackNS: "components",
      lng: "en",
      ns: ["common", "components", "movies", "music", "tv"],
    });

    i18n.use(HttpBackend);

    i18n.init((err, t) => {
      if (err) {
        this.t.error(err);
      } else {
        this.t.next(t);
      }
    });

    this.i18n = i18n;
  }

  changeLanguage(lng: string): void {
    this.i18n.changeLanguage(lng, (err, t) => {
      if (err) {
        this.t.error(err);
      } else {
        this.t.next(t);
      }
    });
  }

  translate(key: string, options?: TOptions): Observable<string> {
    return this.t.pipe(map((t) => t(key, options)));
  }
}
