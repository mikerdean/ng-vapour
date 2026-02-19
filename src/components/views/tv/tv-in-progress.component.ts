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
  selector: "tv-in-progress",
  templateUrl: "tv-in-progress.component.html",
})
export class TvInProgressComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    titleService: TitleService,
    private tvService: TvService,
  ) {
    void titleService.setTranslatedTitle("tv:titles.inprogress");
  }

  readonly tvShows$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.tvService.getTvShowsInProgress().pipe(
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
