import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  faCircleNotch,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { combineLatest, map, of, switchMap } from "rxjs";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { MappingService } from "@vapour/services/mapping.service";
import { MoviesService } from "@vapour/services/movies.service";
import { MusicService } from "@vapour/services/music.service";
import { PlayerService } from "@vapour/services/player.service";
import { TvService } from "@vapour/services/tv.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    FullscreenMessageComponent,
    ThumbnailComponent,
  ],
  standalone: true,
  selector: "playing-button",
  templateUrl: "playing-button.component.html",
})
export class PlayingButtonComponent {
  constructor(
    private mappingService: MappingService,
    private movieService: MoviesService,
    private musicService: MusicService,
    private playerService: PlayerService,
    private tvService: TvService,
  ) {}

  readonly showPlayingModal = signal(false);

  readonly icons = {
    loading: faCircleNotch,
    play: faPlayCircle,
    pause: faPauseCircle,
  };

  readonly players$ = this.playerService.playing$.pipe(
    switchMap((players) =>
      combineLatest(
        players
          .filter(
            (player): player is Required<typeof player> => "item" in player,
          )
          .map((player) => {
            switch (player.item.type) {
              case "episode":
                return this.tvService.getEpisodeById(player.item.id).pipe(
                  switchMap(({ episodedetails }) =>
                    this.mappingService.mapEpisodeToGridItem(episodedetails),
                  ),
                  map((item) => ({ ...player, item })),
                );

              case "movie":
                return this.movieService.getMovieById(player.item.id).pipe(
                  map(({ moviedetails }) =>
                    this.mappingService.mapMovieToGridItem(moviedetails),
                  ),
                  map((item) => ({ ...player, item })),
                );

              case "song":
                return this.musicService.getSongById(player.item.id).pipe(
                  map(({ songdetails }) =>
                    this.mappingService.mapSongDetailsToGridItem(songdetails),
                  ),
                  map((item) => ({ ...player, item })),
                );

              default:
                return of({ ...player, item: null });
            }
          }),
      ),
    ),
  );

  readonly playingState$ = this.playerService.playing$.pipe(
    map(
      (players) =>
        players.find(
          (player) => player.state === "playing" || player.state === "paused",
        )?.state,
    ),
  );

  modalClose() {
    this.showPlayingModal.set(false);
  }

  modalOpen() {
    this.showPlayingModal.set(true);
  }
}
