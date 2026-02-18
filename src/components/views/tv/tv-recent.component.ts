import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { MappingService } from "@vapour/services/mapping.service";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-recent",
  templateUrl: "tv-recent.component.html",
})
export class TvRecentComponent {
  constructor(
    private route: ActivatedRoute,
    private mappingService: MappingService,
    titleService: TitleService,
    private tvService: TvService,
  ) {
    titleService.setTranslatedTitle("tv:titles.recent");
  }

  readonly $episodes = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.tvService.getRecentlyAddedEpisodes().pipe(
        switchMap(({ episodes }) =>
          combineLatest(
            episodes.map((episode) =>
              this.mappingService.mapEpisodeToGridItem(episode),
            ),
          ).pipe(
            map((episodes) => ({
              currentPage: page,
              items: episodes,
              limits: { total: 25 },
            })),
          ),
        ),
      ),
  );
}
