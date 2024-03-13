import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MoviesService } from "@vapour/services/movies.service";
import { mapMovieToGridItem } from "@vapour/shared/mapping";

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

  readonly movies$ = prepareGrid(
    this.route,
    this.configurationService.pageSize,
    (page) =>
      this.moviesService.getMovies(page).pipe(
        map(({ movies, limits }) => ({
          currentPage: page,
          items: movies.map(mapMovieToGridItem),
          limits,
        })),
      ),
  );
}
