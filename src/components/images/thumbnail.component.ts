import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
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

import {
  FontawesomeIconComponent,
  type FontAwesomeIcon,
} from "@vapour/components/images/fontawesome-icon.component";
import { imageUrl } from "@vapour/signals/images";
import { translate } from "@vapour/signals/translate";
import { HostState } from "@vapour/state/host.state";

export type ThumbnailType =
  | "actor"
  | "artist"
  | "album"
  | "song"
  | "musicGenre"
  | "movie"
  | "movieSet"
  | "movieGenre"
  | "tvShow"
  | "tvShowGenre"
  | "season"
  | "episode"
  | "addon"
  | "picture"
  | "channel";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent, NgTemplateOutlet],
  selector: "thumbnail",
  templateUrl: "thumbnail.component.html",
})
export class ThumbnailComponent {
  readonly #hostState = inject(HostState);

  readonly alt = input<string>();
  readonly played = input<boolean>();
  readonly type = input.required<ThumbnailType>();
  readonly uri = input<string>();

  readonly thumbnailUrl = imageUrl(this.#hostState.httpUrl, this.uri);

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

  readonly translations = translate({
    played: "common.played",
  });

  onImageLoaded(element: HTMLImageElement) {
    element.classList.replace("opacity-0", "opacity-100");
  }
}
