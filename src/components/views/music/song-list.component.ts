import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { DurationPipe } from "@vapour/pipes/duration";
import { PadStartPipe } from "@vapour/pipes/padStart";
import { AudioDetailsSong } from "@vapour/shared/kodi";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DurationPipe, FontawesomeIconComponent, PadStartPipe],
  selector: "song-list",
  templateUrl: "song-list.component.html",
})
export class SongListComponent {
  readonly songs = input.required<AudioDetailsSong[]>();

  readonly icons = {
    menu: faEllipsisVertical,
  };
}
