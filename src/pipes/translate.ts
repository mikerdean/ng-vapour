import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { type TOptions } from "i18next";

import { TranslationService } from "@vapour/services/translation.service";

@Pipe({ name: "translate", pure: false, standalone: true })
export class TranslatePipe implements PipeTransform, OnDestroy {
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private translationService: TranslationService,
  ) {
    this.#asyncPipe = new AsyncPipe(changeDetectorRef);
  }

  readonly #asyncPipe: AsyncPipe;

  ngOnDestroy(): void {
    this.#asyncPipe.ngOnDestroy();
  }

  transform(key: string, options?: TOptions): string | null {
    return this.#asyncPipe.transform(
      this.translationService.translate(key, options),
    );
  }
}
