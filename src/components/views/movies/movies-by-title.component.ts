import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { ConfigurationService } from "services/configuration.service";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";
import type { GridData } from "../../grid/grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
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

  readonly movies$: Observable<GridData> = this.route.queryParams.pipe(
    map((query) => {
      const queryPage = parseInt(query["page"], 10);
      return queryPage || 1;
    }),
    switchMap((page) =>
      this.moviesService.getMovies(page).pipe(map((data) => ({ data, page }))),
    ),
    map(({ data: { movies, limits }, page }) => ({
      currentPage: page,
      items: movies.map(mapMovieToGridItem),
      limits,
    })),
  );

  readonly pageSize = this.configurationService.pageSize;
}
