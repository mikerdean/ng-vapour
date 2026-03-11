import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { parse } from "valibot";

import {
  DefinitionListComponent,
  type DefinitionListItem,
} from "@vapour/components/core/definition-list.component";
import { RatingComponent } from "@vapour/components/core/rating.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { SongListComponent } from "@vapour/components/music/song-list.component";
import { MusicService } from "@vapour/services/music.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { translate } from "@vapour/signals/translate";
import { albumValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DefinitionListComponent,
    FanartComponent,
    RatingComponent,
    SongListComponent,
    ThumbnailComponent,
  ],
  selector: "album",
  templateUrl: "album.component.html",
})
export class AlbumComponent {
  readonly #musicService = inject(MusicService);
  readonly #route = inject(ActivatedRoute);

  readonly params = toSignal(this.#route.params);

  readonly album = resource({
    loader: async ({ params }) => {
      const { albumdetails: album } = await this.#musicService.getAlbumById(
        params.albumId,
      );

      const { songs } = await this.#musicService.getSongsByAlbum({
        artist: album.artist,
        album: album.title,
        year: album.year,
      });

      return {
        details: album,
        songs,
      };
    },
    params: () => parse(albumValidator, this.params()),
  });

  readonly translations = translate({
    album: "music.album",
    artist: "music.artist",
    duration: "common.duration",
    genre: "common.genre",
    rating: "common.rating",
    unknown: "common.unknown",
    year: "common.year",
  });

  readonly albumDetails = computed<DefinitionListItem[]>(() => {
    const album = this.album.value();
    if (!album) {
      return [];
    }

    return [
      {
        header: this.translations.album(),
        description:
          album.details.title ||
          album.details.label ||
          this.translations.unknown(),
      },
      {
        header: this.translations.artist(),
        description:
          album.details.artist?.join(", ") || this.translations.unknown(),
      },
      {
        header: this.translations.duration(),
        description:
          getVideoDuration(
            album.songs.reduce(
              (total, song) => total + (song.duration || 0),
              0,
            ),
          ) || this.translations.unknown(),
      },
      {
        header: this.translations.genre(),
        description:
          album.details.genre?.join(", ") || this.translations.unknown(),
      },
      {
        header: this.translations.year(),
        description:
          album.details.year?.toString() || this.translations.unknown(),
      },
    ];
  });
}
