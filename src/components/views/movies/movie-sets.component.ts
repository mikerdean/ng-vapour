import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { PaginationComponent } from "@vapour/components/grid/pagination.component";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { MoviesService } from "@vapour/services/movies.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

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
    private mappingService: MappingService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("movies:titles.sets");
  }

  readonly movies$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
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
              return this.mappingService.mapMovieSetToGridItem(set, count);
            }),
          ).pipe(
            map((items) => ({
              currentPage: page,
              items: items,
              limits: data.limits,
            })),
          );
        }),
      ),
  );
}
