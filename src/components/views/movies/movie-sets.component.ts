import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaginationComponent } from "components/grid/pagination.component";
import { map, Observable, switchMap } from "rxjs";
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
    switchMap((page) => this.moviesService.getMovieSets(page)),
  );

  readonly movies$: Observable<GridItem[]> = this.movieSets.pipe(
    map((data) => data.sets.map(mapSetToGridItem)),
  );

  readonly pageSize = this.configurationService.pageSize;

  readonly pagination$ = this.movieSets.pipe(map((data) => data.limits));
}
