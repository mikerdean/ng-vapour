import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { MoviesService } from "@vapour/services/movies.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

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
    private mappingService: MappingService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("movies:titles.titles");
  }

  readonly movies$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.moviesService.getMovies(page).pipe(
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
