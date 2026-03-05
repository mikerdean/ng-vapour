import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from "@angular/core";
import {
  faCircleNotch,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { ProgressBarComponent } from "@vapour/components/playing/progress-bar.component";
import { MoviesService } from "@vapour/services/movies.service";
import { MusicService } from "@vapour/services/music.service";
import { PlayerService } from "@vapour/services/player.service";
import { TvService } from "@vapour/services/tv.service";

type PlayingItem = {
  id: string | number;
  label: string;
  thumbnail?: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    FullscreenMessageComponent,
    ProgressBarComponent,
    ThumbnailComponent,
  ],
  selector: "playing-button",
  templateUrl: "playing-button.component.html",
})
export class PlayingButtonComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly musicService = inject(MusicService);
  private readonly playerService = inject(PlayerService);
  private readonly tvService = inject(TvService);

  readonly showPlayingModal = signal(false);

  readonly icons = {
    loading: faCircleNotch,
    play: faPlayCircle,
    pause: faPauseCircle,
  };

  readonly players = resource({
    loader: async ({ params: players }) => {
      if (players.length === 0) {
        return [];
      }

      const promises = players.map((player) => {
        let item: Promise<PlayingItem | null>;

        switch (player.item?.type) {
          case "episode": {
            item = this.tvService
              .getEpisodeById(player.item.id)
              .then(
                ({
                  episodedetails: { episodeid, label, title, thumbnail },
                }) => ({
                  id: episodeid,
                  label: title || label,
                  thumbnail,
                }),
              );

            break;
          }

          case "movie": {
            item = this.moviesService
              .getMovieById(player.item.id)
              .then(
                ({ moviedetails: { movieid, label, title, thumbnail } }) => ({
                  id: movieid,
                  label: title || label,
                  thumbnail,
                }),
              );
            break;
          }

          case "song": {
            item = this.musicService
              .getSongById(player.item.id)
              .then(({ songdetails: { songid, label, title, thumbnail } }) => ({
                id: songid,
                label: title || label,
                thumbnail,
              }));
            break;
          }

          default:
            item = Promise.resolve(null);
            break;
        }

        return Promise.all([
          item,
          this.playerService.getProperties(player.id),
        ]).then(([item, props]) => ({
          ...player,
          item,
          props,
        }));
      });

      const results = await Promise.all(promises);
      return results;
    },
    params: this.playerService.playing,
  });

  readonly playingState = computed(() => {
    const players = this.playerService.playing();

    const playPaused = players.find(
      (player) => player.state === "playing" || player.state === "paused",
    );

    return playPaused?.state;
  });

  modalClose(): void {
    this.showPlayingModal.set(false);
  }

  modalOpen(): void {
    this.showPlayingModal.set(true);
  }
}
