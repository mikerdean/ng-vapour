import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { MoviesService } from "@vapour/services/movies.service";
import { TitleService } from "@vapour/services/title.service";
import { genreValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "movie-genre",
  templateUrl: "movie-genre.component.html",
})
export class MovieGenreComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private titleService: TitleService,
  ) {}

  readonly movies$ = prepareGrid(
    genreValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ genre }, { page }) =>
      this.moviesService.getMoviesByGenre(genre, page).pipe(
        tap(
          () =>
            void this.titleService.setTranslatedTitle("movies:titles.genre", {
              genre,
            }),
        ),
        map(({ movies, limits }) => ({
          currentPage: page,
          items: movies.map((movie) =>
            this.mappingService.mapMovieToGridItem(movie),
          ),
          limits,
        })),
      ),
  );
}
