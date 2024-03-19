import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { MoviesService } from "@vapour/services/movies.service";
import { mapMovieToGridItem } from "@vapour/shared/mapping";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "recent-movies",
  standalone: true,
  templateUrl: "recent-movies.component.html",
})
export class RecentMoviesComponent {
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {}

  readonly movies$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.moviesService.getRecentlyAddedMovies().pipe(
        map(({ movies }) => ({
          currentPage: page,
          items: movies.map(mapMovieToGridItem),
          limits: { total: 25 },
        })),
      ),
  );
}
