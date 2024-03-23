import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

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
  selector: "tv-genres",
  standalone: true,
  templateUrl: "tv-genres.component.html",
})
export class TvGenresComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    titleService: TitleService,
    private tvService: TvService,
  ) {
    titleService.setTranslatedTitle("tv:titles.genres");
  }

  readonly genres$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.tvService.getTvShowGenres(page).pipe(
        map(({ genres, limits }) => ({
          currentPage: page,
          items: genres.map((genre) =>
            this.mappingService.mapGenreToGridItem(genre, "tv"),
          ),
          limits,
        })),
      ),
  );
}
