import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { MusicService } from "@vapour/services/music.service";
import { TitleService } from "@vapour/services/title.service";
import { genreValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "music-genre",
  standalone: true,
  templateUrl: "music-genre.component.html",
})
export class MusicGenreComponent {
  constructor(
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    private titleService: TitleService,
  ) {}

  readonly artists = prepareGrid(
    genreValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    ({ genre }, { page }) =>
      this.musicService.getArtistsByGenre(genre, page).pipe(
        tap(() =>
          this.titleService.setTranslatedTitle("music:titles.genre", { genre }),
        ),
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
