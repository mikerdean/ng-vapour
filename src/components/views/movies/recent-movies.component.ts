import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, Observable } from "rxjs";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";
import type { GridData } from "../../grid/grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GridComponent],
  selector: "recent-movies",
  standalone: true,
  templateUrl: "recent-movies.component.html",
})
export class RecentMoviesComponent {
  constructor(private moviesService: MoviesService) {}

  readonly movies$: Observable<GridData> = this.moviesService
    .getRecentlyAddedMovies()
    .pipe(
      map(({ movies }) => ({
        currentPage: 1,
        items: movies.map(mapMovieToGridItem),
      })),
    );
}
