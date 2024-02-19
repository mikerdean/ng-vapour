import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, map, Observable, switchMap } from "rxjs";
import { ConfigurationService } from "services/configuration.service";

import { MoviesService } from "../../../services/movies.service";
import { mapMovieToGridItem } from "../../../shared/mapping";
import { GridComponent } from "../../grid/grid.component";
import type { GridData } from "../../grid/grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GridComponent],
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

  readonly movies$: Observable<GridData> = this.route.queryParams.pipe(
    debounceTime(25),
    map((query) => parseInt(query["page"], 10) || 1),
    switchMap((page) =>
      this.moviesService.getMovies(page).pipe(
        map(({ movies, limits }) => ({
          currentPage: page,
          items: movies.map(mapMovieToGridItem),
          limits,
        })),
      ),
    ),
  );

  readonly pageSize = this.configurationService.pageSize;
}
