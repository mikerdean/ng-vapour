import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
import { map, Observable } from "rxjs";

import { HideUntilIntersectedDirective } from "../../directives/hide-until-intersected.directive";
import { HostService } from "../../services/host.service";
import { FontawesomeIconComponent } from "./fontawesome-icon.component";
import type { ThumbnailType } from "./thumbnail.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent, HideUntilIntersectedDirective],
  selector: "thumbnail",
  standalone: true,
  templateUrl: "thumbnail.component.html",
})
export class ThumbnailComponent implements OnInit {
  constructor(private hostService: HostService) {}

  @Input() alt?: string;
  @Input() played?: boolean;
  @Input({ required: true }) type!: ThumbnailType;
  @Input() uri?: string;

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

  ngOnInit(): void {
    this.imageUrl$ = this.hostService.httpUrl$.pipe(
      map((baseUrl) => {
        if (!baseUrl || !this.uri) {
          return;
        }

        const encoded = encodeURIComponent(this.uri);
        const url = new URL(`image/${encoded}`, baseUrl);
        return url.toString();
      }),
    );
  }
}
