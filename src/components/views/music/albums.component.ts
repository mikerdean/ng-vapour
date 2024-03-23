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
  selector: "albums",
  standalone: true,
  templateUrl: "albums.component.html",
})
export class AlbumsComponent {
  constructor(
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("music:titles.albums");
  }

  readonly albums$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.musicService.getAlbums(page).pipe(
        map(({ albums, limits }) => ({
          currentPage: page,
          items: albums.map((album) =>
            this.mappingService.mapAlbumToGridItem(album),
          ),
          limits,
        })),
      ),
  );
}
