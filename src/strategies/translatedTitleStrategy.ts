import { Injectable, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { BehaviorSubject, combineLatest, of, switchMap } from "rxjs";

import { TranslationService } from "@vapour/services/translation.service";

@Injectable({ providedIn: "root" })
export class TranslatedTitleStrategy
  extends TitleStrategy
  implements OnDestroy
{
  private readonly titleSubject = new BehaviorSubject<string | undefined>(
    undefined,
  );

  private readonly titleUpdate = combineLatest([
    this.titleSubject,
    this.translationService.translate("common:pageTitle.main"),
  ])
    .pipe(
      switchMap(([key, mainTitle]) => {
        if (key) {
          return this.translationService.translate(key).pipe(
            switchMap((pageTitle) =>
              this.translationService.translate("common:pageTitle.combined", {
                pageTitle,
              }),
            ),
          );
        } else {
          return of(mainTitle);
        }
      }),
    )
    .subscribe((title) => {
      this.title.setTitle(title);
    });

  constructor(
    private readonly title: Title,
    private readonly translationService: TranslationService,
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.titleUpdate.unsubscribe();
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const key = this.buildTitle(snapshot);
    this.titleSubject.next(key);
  }
}
