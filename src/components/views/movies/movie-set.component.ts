import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MoviesService } from "@vapour/services/movies.service";
import { mapMovieToGridItem } from "@vapour/shared/mapping";
import { movieSetValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "movie-genre",
  standalone: true,
  templateUrl: "movie-genre.component.html",
})
export class MovieSetComponent {
  constructor(
    private configurationService: ConfigurationService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {}

  readonly movies$ = prepareGrid(
    movieSetValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ movieSetId }, { page }) =>
      this.moviesService.getMovieSetById(movieSetId).pipe(
        map(({ setdetails: { movies } }) => ({
          currentPage: page,
          items: movies.map(mapMovieToGridItem),
          limits: { total: movies.length },
        })),
      ),
  );
}
