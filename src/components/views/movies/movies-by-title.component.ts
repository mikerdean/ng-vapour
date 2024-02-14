import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaginationComponent } from "components/grid/pagination.component";
import { map, Observable, switchMap } from "rxjs";
import { ConfigurationService } from "services/configuration.service";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";
import type { GridItem } from "../../grid/grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent, PaginationComponent],
  selector: "movies-by-title",
  standalone: true,
  templateUrl: "movies-by-title.component.html",
})
export class MoviesByTitleComponent {
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

  readonly moviesByTitle = this.currentPage$.pipe(
    switchMap((page) => this.moviesService.getMovies(page)),
  );

  readonly movies$: Observable<GridItem[]> = this.moviesByTitle.pipe(
    map((data) => data.movies.map(mapMovieToGridItem)),
  );

  readonly pageSize = this.configurationService.pageSize;

  readonly pagination$ = this.moviesByTitle.pipe(map((data) => data.limits));
}
