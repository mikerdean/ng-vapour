import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { MappingService } from "@vapour/services/mapping.service";
import { MoviesService } from "@vapour/services/movies.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "recent-movies",
  templateUrl: "recent-movies.component.html",
})
export class RecentMoviesComponent {
  constructor(
    private mappingService: MappingService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    void titleService.setTranslatedTitle("movies:titles.recent");
  }

  readonly movies$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.moviesService.getRecentlyAddedMovies().pipe(
        map(({ movies }) => ({
          currentPage: page,
          items: movies.map((movie) =>
            this.mappingService.mapMovieToGridItem(movie),
          ),
          limits: { total: 25 },
        })),
      ),
  );
}
