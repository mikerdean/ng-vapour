import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  viewChild,
  type ElementRef,
  type OnChanges,
  type SimpleChanges,
} from "@angular/core";

import { imageUrl } from "@vapour/signals/images";
import { mediaQuery } from "@vapour/signals/mediaQuery";
import { HostState } from "@vapour/state/host.state";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "fanart",
  templateUrl: "fanart.component.html",
})
export class FanartComponent implements OnChanges {
  readonly #hostState = inject(HostState);

  readonly uri = input<string>();

  readonly fanartUrl = imageUrl(this.#hostState.httpUrl, this.uri);
  readonly isMinWidth = mediaQuery("(min-width: 640px)");

  readonly fanartElement =
    viewChild.required<ElementRef<HTMLImageElement>>("fanart");

  ngOnChanges(changes: SimpleChanges): void {
    if ("uri" in changes && !changes["uri"].isFirstChange()) {
      this.fanartElement().nativeElement.classList.replace(
        "opacity-100",
        "opacity-0",
      );
    }
  }

  onImageLoaded() {
    this.fanartElement().nativeElement.classList.replace(
      "opacity-0",
      "opacity-100",
    );
  }
}
