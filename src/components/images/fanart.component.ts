import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";

import { HostService } from "@vapour/services/host.service";
import { imageUrl } from "@vapour/signals/images";
import { mediaQuery } from "@vapour/signals/mediaQuery";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "fanart",
  templateUrl: "fanart.component.html",
})
export class FanartComponent {
  readonly #hostService = inject(HostService);

  readonly uri = input<string>();

  readonly fanartUrl = imageUrl(this.#hostService.httpUrl, this.uri);
  readonly isMinWidth = mediaQuery("(min-width: 640px)");

  onImageLoaded(element: HTMLImageElement) {
    element.classList.replace("opacity-0", "opacity-100");
  }
}
