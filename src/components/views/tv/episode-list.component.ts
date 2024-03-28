import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { DurationPipe } from "@vapour/pipes/duration";
import { PadStartPipe } from "@vapour/pipes/padStart";
import type { VideoDetailsEpisode } from "@vapour/shared/kodi";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DurationPipe,
    FontawesomeIconComponent,
    PadStartPipe,
    ThumbnailComponent,
  ],
  selector: "episode-list",
  standalone: true,
  templateUrl: "episode-list.component.html",
})
export class EpisodeListComponent {
  readonly episodes = input.required<VideoDetailsEpisode[]>();

  readonly icons = {
    menu: faEllipsisVertical,
  };
}
