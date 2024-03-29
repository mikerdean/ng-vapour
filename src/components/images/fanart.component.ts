import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { combineLatest, map } from "rxjs";

import { HostService } from "@vapour/services/host.service";
import { toImageUrl } from "@vapour/shared/images";
import { fromMediaQuery } from "@vapour/shared/mediaQuery";

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

  readonly fanartUrl$ = combineLatest([
    fromMediaQuery("(min-width: 640px)"),
    toImageUrl(this.hostService.httpUrl$, toObservable(this.uri)),
  ]).pipe(map(([matches, imageUrl]) => (matches ? imageUrl : undefined)));

  onImageLoaded(element: HTMLImageElement) {
    element.classList.remove("opacity-0");
    requestAnimationFrame(() => {
      element.classList.add("opacity-100");
    });
  }
}
