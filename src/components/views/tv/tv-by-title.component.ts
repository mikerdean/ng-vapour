import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-by-title",
  templateUrl: "tv-by-title.component.html",
})
export class TvByTitleComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    titleService: TitleService,
    private tvService: TvService,
  ) {
    titleService.setTranslatedTitle("tv:titles.titles");
  }

  readonly tvShows$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.tvService.getTvShows(page).pipe(
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
