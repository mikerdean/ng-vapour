import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  type SimpleChanges,
} from "@angular/core";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faCompactDisc,
  faFilm,
  faMusic,
  faTv,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailType } from "@vapour/components/images/thumbnail.types";
import { HostService } from "@vapour/services/host.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent],
  selector: "thumbnail",
  standalone: true,
  templateUrl: "thumbnail.component.html",
})
export class ThumbnailComponent implements OnChanges, OnInit {
  constructor(private hostService: HostService) {}

  @Input() alt?: string;
  @Input() played?: boolean;
  @Input({ required: true }) type!: ThumbnailType;
  @Input() uri?: string;

  readonly #uriSubject = new BehaviorSubject(this.uri);

  get fallbackIcon(): IconDefinition {
    switch (this.type) {
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
  }

  imageUrl$!: Observable<string | undefined>;

  ngOnChanges(changes: SimpleChanges) {
    const uri = changes["uri"];
    if (uri) {
      this.#uriSubject.next(undefined);
      requestAnimationFrame(() => {
        this.#uriSubject.next(uri.currentValue);
      });
    }
  }

  ngOnInit(): void {
    this.imageUrl$ = combineLatest([
      this.hostService.httpUrl$,
      this.#uriSubject,
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

  onImageLoaded(element: HTMLImageElement) {
    element.classList.remove("opacity-0");
    requestAnimationFrame(() => {
      element.classList.add("opacity-100");
    });
  }
}
