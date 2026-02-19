import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  faBolt,
  faCheckCircle,
  faCircle,
  faCompactDisc,
  faCubes,
  faFilm,
  faImage,
  faMusic,
  faTv,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import type { FontAwesomeIcon } from "@vapour/components/images/fontawesome.types";
import type { ThumbnailType } from "@vapour/components/images/thumbnail.types";
import { TranslatePipe } from "@vapour/pipes/translate";
import { HostService } from "@vapour/services/host.service";
import { toImageUrl } from "@vapour/shared/images";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    NgTemplateOutlet,
    TranslatePipe,
  ],
  selector: "thumbnail",
  templateUrl: "thumbnail.component.html",
})
export class ThumbnailComponent {
  constructor(private hostService: HostService) {}

  readonly alt = input<string>();
  readonly played = input<boolean>();
  readonly type = input.required<ThumbnailType>();
  readonly uri = input<string>();

  readonly imageUrl$ = toImageUrl(
    toObservable(this.hostService.httpUrl),
    toObservable(this.uri),
  );

  readonly icons = {
    fallback: computed<FontAwesomeIcon>(() => {
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
        case "addon":
          return faCubes;
        case "picture":
          return faImage;
        case "channel":
          return faBolt;
      }
    }),
    checkCircle: faCheckCircle,
    circle: faCircle,
  };

  onImageLoaded(element: HTMLImageElement) {
    element.classList.replace("opacity-0", "opacity-100");
  }
}
