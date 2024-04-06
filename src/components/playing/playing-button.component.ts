import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  faCircleNotch,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { PlayerService } from "@vapour/services/player.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent, FullscreenMessageComponent],
  standalone: true,
  selector: "playing-button",
  templateUrl: "playing-button.component.html",
})
export class PlayingButtonComponent {
  constructor(private playerService: PlayerService) {}

  readonly showPlayingModal = signal(false);

  readonly icons = {
    loading: faCircleNotch,
    play: faPlayCircle,
    pause: faPauseCircle,
  };

  readonly playingState$ = this.playerService.playing$.pipe(
    map((info) =>
      info.state === "playing" || info.state === "paused"
        ? info.state
        : undefined,
    ),
  );

  modalClose() {
    this.showPlayingModal.set(false);
  }

  modalOpen() {
    this.showPlayingModal.set(true);
  }
}
