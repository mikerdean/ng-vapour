import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  faCircleNotch,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { combineLatest, map, Observable, of, switchMap } from "rxjs";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import type { GridItem } from "@vapour/components/grid/grid.types";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { ProgressBarComponent } from "@vapour/components/playing/progress-bar.component";
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
    ProgressBarComponent,
    ThumbnailComponent,
  ],
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
    switchMap((players) => {
      if (players.length === 0) {
        this.modalClose();
        return of([]);
      }

      return combineLatest(
        players.map((player) => {
          let item: Observable<GridItem | null> = of(null);

          switch (player.item?.type) {
            case "episode":
              item = this.tvService
                .getEpisodeById(player.item.id)
                .pipe(
                  switchMap(({ episodedetails }) =>
                    this.mappingService.mapEpisodeToGridItem(episodedetails),
                  ),
                );
              break;

            case "movie":
              item = this.movieService
                .getMovieById(player.item.id)
                .pipe(
                  map(({ moviedetails }) =>
                    this.mappingService.mapMovieToGridItem(moviedetails),
                  ),
                );
              break;

            case "song":
              item = this.musicService
                .getSongById(player.item.id)
                .pipe(
                  map(({ songdetails }) =>
                    this.mappingService.mapSongDetailsToGridItem(songdetails),
                  ),
                );
              break;
          }

          return combineLatest([
            this.playerService.getPlayerProperties(player.id),
            item,
          ]).pipe(map(([props, item]) => ({ ...player, item, props })));
        }),
      );
    }),
  );

  readonly playingState$ = this.playerService.playing$.pipe(
    map(
      (players) =>
        players.find(
          (player) => player.state === "playing" || player.state === "paused",
        )?.state,
    ),
  );

  modalClose(): void {
    this.showPlayingModal.set(false);
  }

  modalOpen(): void {
    this.showPlayingModal.set(true);
  }
}
