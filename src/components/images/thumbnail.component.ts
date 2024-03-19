import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faCheckCircle,
  faCircle,
  faCompactDisc,
  faFilm,
  faMusic,
  faTv,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { combineLatest, delay, map, Observable, of, switchMap } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailType } from "@vapour/components/images/thumbnail.types";
import { HostService } from "@vapour/services/host.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent, NgTemplateOutlet],
  selector: "thumbnail",
  standalone: true,
  templateUrl: "thumbnail.component.html",
})
export class ThumbnailComponent {
  constructor(private hostService: HostService) {
    this.imageUrl$ = combineLatest([
      this.hostService.httpUrl$,
      toObservable(this.uri).pipe(
        switchMap((uri, i) => {
          if (i === 0) {
            return of(uri);
          } else {
            return of(undefined, uri).pipe(delay(25));
          }
        }),
      ),
    ]).pipe(
      map(([baseUrl, uri]) => {
        if (!baseUrl || !uri) {
          return;
        }

        const encoded = encodeURIComponent(uri);
        const url = new URL(`image/${encoded}`, baseUrl);
        return url.toString();
      }),
    );
  }

  readonly alt = input<string>();
  readonly imageUrl$: Observable<string | undefined>;
  readonly played = input<boolean>();
  readonly type = input.required<ThumbnailType>();
  readonly uri = input<string>();

  readonly icons = {
    fallback: computed<IconDefinition>(() => {
      switch (this.type()) {
        case "album":
          return faCompactDisc;
        case "actor":
          return faUser;
        case "artist":
          return faUsers;
        case "song":
        case "musicGenre":
          return faMusic;
        case "movie":
        case "movieGenre":
        case "movieSet":
          return faFilm;
        case "tvShow":
        case "tvShowGenre":
        case "season":
        case "episode":
          return faTv;
      }
    }),
    checkCircle: faCheckCircle,
    circle: faCircle,
  };

  onImageLoaded(element: HTMLImageElement) {
    element.classList.remove("opacity-0");
    requestAnimationFrame(() => {
      element.classList.add("opacity-100");
    });
  }
}
