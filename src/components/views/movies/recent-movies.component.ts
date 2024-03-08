import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { prepareGrid } from "components/grid/grid.utils";
import { map } from "rxjs";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";

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

  readonly movies$ = prepareGrid(this.route, 25, () =>
    this.moviesService.getRecentlyAddedMovies().pipe(
      map(({ movies }) => ({
        currentPage: 1,
        items: movies.map(mapMovieToGridItem),
      })),
    ),
  );
}
