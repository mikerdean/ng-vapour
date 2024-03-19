import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { PaginationComponent } from "@vapour/components/grid/pagination.component";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MoviesService } from "@vapour/services/movies.service";
import { TranslationService } from "@vapour/services/translation.service";
import { mapSetToGridItem } from "@vapour/shared/mapping";
import { pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent, PaginationComponent],
  selector: "movies-sets",
  standalone: true,
  templateUrl: "movie-sets.component.html",
})
export class MovieSetsComponent {
  constructor(
    private configurationService: ConfigurationService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private translationService: TranslationService,
  ) {}

  readonly movies$ = prepareGrid(
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ page }) =>
      combineLatest([
        this.moviesService.getMovieSets(page),
        this.moviesService.getMoviesInSets(),
      ]).pipe(
        switchMap(([data, moviesInSets]) => {
          const sets: Record<string, number> = {};
          moviesInSets.movies.forEach((movie) => {
            const setName = movie.set || "__UNKNOWN__";
            if (!sets[setName]) {
              sets[setName] = 0;
            }

            sets[setName] += 1;
          });

          return combineLatest(
            data.sets.map((set) => {
              const count = sets[set.title || ""] || 0;
              return this.translationService
                .translate("movies:movieCount", { count })
                .pipe(map((label) => ({ set, label })));
            }),
          ).pipe(
            map((items) => ({
              currentPage: page,
              items: items.map(({ set, label }) => ({
                ...mapSetToGridItem(set),
                details: [label],
              })),
              limits: data.limits,
            })),
          );
        }),
      ),
  );
}
