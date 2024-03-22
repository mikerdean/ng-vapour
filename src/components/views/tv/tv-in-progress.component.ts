import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { mapTvShowToGridItem } from "@vapour/shared/mapping";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-in-progress",
  standalone: true,
  templateUrl: "tv-in-progress.component.html",
})
export class TvInProgressComponent {
  constructor(
    private configurationService: ConfigurationService,
    private route: ActivatedRoute,
    titleService: TitleService,
    private tvService: TvService,
  ) {
    titleService.setTranslatedTitle("tv:titles.inprogress");
  }

  readonly tvShows$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.tvService.getTvShowsInProgress().pipe(
        map(({ tvshows, limits }) => ({
          currentPage: page,
          items: tvshows.map(mapTvShowToGridItem),
          limits,
        })),
      ),
  );
}
