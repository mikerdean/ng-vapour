import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap, tap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { genreValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-genre",
  templateUrl: "tv-genre.component.html",
})
export class TvGenreComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private tvService: TvService,
  ) {}

  readonly tvShows$ = prepareGrid(
    genreValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ genre }, { page }) =>
      this.tvService.getTvShowsByGenre(genre, page).pipe(
        tap(
          () =>
            void this.titleService.setTranslatedTitle("tv:titles.genre", {
              genre,
            }),
        ),
        switchMap(({ tvshows, limits }) =>
          combineLatest(
            tvshows.map((tvshow) =>
              this.mappingService.mapTvShowToGridItem(tvshow),
            ),
          ).pipe(
            map((items) => ({
              currentPage: page,
              items,
              limits,
            })),
          ),
        ),
      ),
  );
}
