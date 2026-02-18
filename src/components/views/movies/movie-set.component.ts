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
import { movieSetValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "movie-set",
  templateUrl: "movie-set.component.html",
})
export class MovieSetComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private titleService: TitleService,
  ) {}

  readonly movies$ = prepareGrid(
    movieSetValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ movieSetId }, { page }) =>
      this.moviesService.getMovieSetById(movieSetId).pipe(
        tap(({ setdetails }) =>
          this.titleService.setRawTitle(setdetails.label),
        ),
        map(({ setdetails: { movies } }) => ({
          currentPage: page,
          items: movies.map((movie) =>
            this.mappingService.mapMovieToGridItem(movie),
          ),
          limits: { total: movies.length },
        })),
      ),
  );
}
