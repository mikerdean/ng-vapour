import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { prepareGrid } from "components/grid/grid.utils";
import { PaginationComponent } from "components/grid/pagination.component";
import { combineLatest, map } from "rxjs";
import { ConfigurationService } from "services/configuration.service";

import { MoviesService } from "../../../services/movies.service";
import { mapSetToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";

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
  ) {}

  readonly movies$ = prepareGrid(
    this.route,
    this.configurationService.pageSize,
    (page) =>
      combineLatest([
        this.moviesService.getMovieSets(page),
        this.moviesService.getMoviesInSets(),
      ]).pipe(
        map(([data, moviesInSets]) => {
          const sets: Record<string, number> = {};
          moviesInSets.movies.forEach((movie) => {
            const setName = movie.set || "__UNKNOWN__";
            if (!sets[setName]) {
              sets[setName] = 0;
            }

            sets[setName] += 1;
          });

          const items = data.sets.map((set) => ({
            ...mapSetToGridItem(set),
            details: [this.getMovieSetTitle(set.title, sets)],
          }));

          return { currentPage: page, items, limits: data.limits };
        }),
      ),
  );

  private getMovieSetTitle(
    title: string | undefined,
    sets: Record<string, number>,
  ): string | undefined {
    if (!title) {
      return undefined;
    }

    const total = sets[title] || 0;
    if (total < 1) {
      return undefined;
    }

    if (total === 1) {
      return "1 movie";
    }

    return `${total} movies`;
  }
}
