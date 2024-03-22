import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { mapEpisodeToGridItem } from "@vapour/shared/mapping";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-recent",
  standalone: true,
  templateUrl: "tv-recent.component.html",
})
export class TvRecentComponent {
  constructor(
    private route: ActivatedRoute,
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
        map(({ episodes }) => ({
          currentPage: page,
          items: episodes.map(mapEpisodeToGridItem),
          limits: { total: 25 },
        })),
      ),
  );
}
