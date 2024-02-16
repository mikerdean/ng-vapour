import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaginationComponent } from "components/grid/pagination.component";
import { combineLatest, map, Observable, switchMap } from "rxjs";
import { ConfigurationService } from "services/configuration.service";

import { MoviesService } from "../../../services/movies.service";
import { mapSetToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";
import type { GridItem } from "../../grid/grid.types";

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

  readonly currentPage$ = this.route.queryParams.pipe(
    map((query) => {
      const queryPage = parseInt(query["page"], 10);
      return queryPage || 1;
    }),
  );

  readonly movieSets = this.currentPage$.pipe(
    switchMap((page) =>
      combineLatest([
        this.moviesService.getMovieSets(page),
        this.moviesService.getMoviesInSets(),
      ]),
    ),
  );

  readonly movies$: Observable<GridItem[]> = this.movieSets.pipe(
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

      return items;
    }),
  );

  readonly pageSize = this.configurationService.pageSize;

  readonly pagination$ = this.movieSets.pipe(map(([data]) => data.limits));

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
