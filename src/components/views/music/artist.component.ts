import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { MappingService } from "@vapour/services/mapping.service";
import { MusicService } from "@vapour/services/music.service";
import { TitleService } from "@vapour/services/title.service";
import { artistValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "artist",
  templateUrl: "artist.component.html",
})
export class ArtistComponent {
  constructor(
    private mappingService: MappingService,
    private musicService: MusicService,
    private route: ActivatedRoute,
    private titleService: TitleService,
  ) {}

  readonly albums$ = prepareGrid(
    artistValidator,
    pageValidator,
    this.route,
    25,
    ({ artistId }, { page }) =>
      this.musicService.getArtistById(artistId).pipe(
        tap(
          ({ artistdetails }) =>
            void this.titleService.setRawTitle(artistdetails.label),
        ),
        switchMap(({ artistdetails }) =>
          this.musicService.getAlbumsByAlbumArtist(artistdetails.artist),
        ),
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
