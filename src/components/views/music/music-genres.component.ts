import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MusicService } from "@vapour/services/music.service";
import { mapGenreToGridItem } from "@vapour/shared/mapping";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "music-genres",
  standalone: true,
  templateUrl: "music-genres.component.html",
})
export class MusicGenresComponent {
  constructor(
    private configurationService: ConfigurationService,
    private musicService: MusicService,
    private route: ActivatedRoute,
  ) {}

  readonly genres$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.musicService.getMusicGenres(page).pipe(
        map(({ genres, limits }) => ({
          currentPage: page,
          items: genres.map((genre) => mapGenreToGridItem(genre, "music")),
          limits,
        })),
      ),
  );
}
