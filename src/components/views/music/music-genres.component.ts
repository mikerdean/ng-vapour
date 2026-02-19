import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { MusicService } from "@vapour/services/music.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "music-genres",
  templateUrl: "music-genres.component.html",
})
export class MusicGenresComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    void titleService.setTranslatedTitle("music:titles.genres");
  }

  readonly genres$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.musicService.getMusicGenres(page).pipe(
        map(({ genres, limits }) => ({
          currentPage: page,
          items: genres.map((genre) =>
            this.mappingService.mapGenreToGridItem(genre, "music"),
          ),
          limits,
        })),
      ),
  );
}
