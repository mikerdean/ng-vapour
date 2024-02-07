import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, Observable } from "rxjs";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
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

  readonly recentMovies$ = this.moviesService.getRecentlyAddedMovies();

  readonly movies$: Observable<GridItem[]> = this.recentMovies$.pipe(
    map((data) => data.movies.map(mapMovieToGridItem)),
  );

  readonly pagination$ = this.recentMovies$.pipe(map((data) => data.limits));
}
