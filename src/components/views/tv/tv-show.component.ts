import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, map, switchMap, tap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { TitleService } from "@vapour/services/title.service";
import { TvService } from "@vapour/services/tv.service";
import { pageValidator, tvShowValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "tv-show",
  templateUrl: "tv-show.component.html",
})
export class TvShowComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private tvService: TvService,
  ) {}

  readonly seasons$ = prepareGrid(
    tvShowValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ tvShowId }, { page }) =>
      combineLatest([
        this.tvService.getTvShowById(tvShowId),
        this.tvService.getSeasonsByTvShowId(tvShowId),
      ]).pipe(
        tap(([{ tvshowdetails }, { seasons }]) => {
          if (tvshowdetails.season === 1) {
            this.router.navigate(["tv", "seasons", seasons[0].seasonid], {
              replaceUrl: true,
            });
          }
        }),
        tap(([{ tvshowdetails }]) =>
          this.titleService.setRawTitle(tvshowdetails.label),
        ),
        switchMap(([, { seasons, limits }]) =>
          combineLatest(
            seasons.map((season) =>
              this.mappingService.mapSeasonToGridItem(season),
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
