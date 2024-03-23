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
  selector: "recent-albums",
  standalone: true,
  templateUrl: "recent-albums.component.html",
})
export class RecentAlbumsComponent {
  constructor(
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("music:titles.recent");
  }

  readonly albums$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    25,
    (_, { page }) =>
      this.musicService.getRecentlyAddedAlbums().pipe(
        map(({ albums }) => ({
          currentPage: page,
          items: albums.map((album) =>
            this.mappingService.mapAlbumToGridItem(album),
          ),
          limits: { total: 25 },
        })),
      ),
  );
}
