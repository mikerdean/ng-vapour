import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { MappingService } from "@vapour/services/mapping.service";
import { MusicService } from "@vapour/services/music.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "artists",
  standalone: true,
  templateUrl: "artists.component.html",
})
export class ArtistsComponent {
  constructor(
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("music:titles.artists");
  }

  readonly artists$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.musicService.getArtists(page).pipe(
        map(({ artists, limits }) => ({
          currentPage: page,
          items: artists.map((artist) =>
            this.mappingService.mapArtistToGridItem(artist),
          ),
          limits,
        })),
      ),
  );
}
