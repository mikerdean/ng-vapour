import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";
import { parse } from "valibot";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MoviesService } from "@vapour/services/movies.service";
import { mapMovieToGridItem } from "@vapour/shared/mapping";
import { genreValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "movie-genre",
  standalone: true,
  templateUrl: "movie-genre.component.html",
})
export class MovieGenreComponent {
  constructor(
    private configurationService: ConfigurationService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
  ) {}

  readonly movies$ = prepareGrid(
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ page }) =>
      this.route.params.pipe(
        switchMap((params) => {
          const { genre } = parse(genreValidator, params);

          return this.moviesService.getMoviesByGenre({ genre, page }).pipe(
            map(({ movies, limits }) => ({
              currentPage: page,
              items: movies.map(mapMovieToGridItem),
              limits,
            })),
          );
        }),
      ),
  );
}
