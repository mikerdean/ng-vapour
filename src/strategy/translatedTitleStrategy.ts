import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

import { TranslationState } from "@vapour/state/translation.state";

@Injectable({ providedIn: "root" })
export class TranslatedTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);
  readonly #translationState = inject(TranslationState);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const t = this.#translationState.t();
    if (!t) {
      return;
    }

    if (snapshot.root.title) {
      this.#title.setTitle(
        t("titles.mainWithSubtitle", { pageTitle: snapshot.root.title }),
      );
    } else {
      this.#title.setTitle(t("titles.main"));
    }
  }
}
