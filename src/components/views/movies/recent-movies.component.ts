import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, Observable } from "rxjs";

import { MoviesService } from "../../../services/movies.service";
import { getVideoDuration } from "../../../shared/duration";
import { GridComponent } from "../../grid/grid.component";
import type { GridItem } from "../../grid/grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GridComponent],
  selector: "recent-movies",
  standalone: true,
  templateUrl: "recent-movies.component.html",
})
export class RecentMoviesComponent {
  constructor(private moviesService: MoviesService) {}

  readonly movies$: Observable<GridItem[]> = this.moviesService
    .getRecentlyAddedMovies()
    .pipe(
      map((data) =>
        data.movies.map((movie) => ({
          id: movie.movieid,
          details: [
            movie.runtime && getVideoDuration(movie.runtime),
            movie.year,
          ],
          label: movie.label,
          played: movie.playcount !== undefined && movie.playcount > 0,
          thumbnail: movie.art?.poster,
          url: `/movies/${movie.movieid}`,
        })),
      ),
    );
}
