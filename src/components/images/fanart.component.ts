import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";

import { imageUrl } from "@vapour/signals/images";
import { mediaQuery } from "@vapour/signals/mediaQuery";
import { HostState } from "@vapour/state/host.state";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "fanart",
  templateUrl: "fanart.component.html",
})
export class FanartComponent {
  readonly #hostState = inject(HostState);

  readonly uri = input<string>();

  readonly fanartUrl = imageUrl(this.#hostState.httpUrl, this.uri);
  readonly isMinWidth = mediaQuery("(min-width: 640px)");

  onImageLoaded(element: HTMLImageElement) {
    element.classList.replace("opacity-0", "opacity-100");
  }
}
