import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

import { HostService } from "@vapour/services/host.service";
import { toImageUrl } from "@vapour/shared/images";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  selector: "fanart",
  standalone: true,
  templateUrl: "fanart.component.html",
})
export class FanartComponent {
  constructor(private hostService: HostService) {}

  readonly uri = input<string>();

  readonly fanartUrl$ = toImageUrl(
    this.hostService.httpUrl$,
    toObservable(this.uri),
  );

  onImageLoaded(element: HTMLImageElement) {
    element.classList.remove("opacity-0");
    requestAnimationFrame(() => {
      element.classList.add("opacity-100");
    });
  }
}
