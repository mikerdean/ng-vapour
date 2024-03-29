import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap, tap } from "rxjs";
import { parse } from "valibot";

import { DefinitionListComponent } from "@vapour/components/core/definition-list.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { RatingComponent } from "@vapour/components/core/rating.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { SongListComponent } from "@vapour/components/views/music/song-list.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { MusicService } from "@vapour/services/music.service";
import { TitleService } from "@vapour/services/title.service";
import { TranslationService } from "@vapour/services/translation.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { albumValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DefinitionListComponent,
    FanartComponent,
    HeadingComponent,
    RatingComponent,
    SongListComponent,
    ThumbnailComponent,
    TranslatePipe,
  ],
  selector: "album",
  standalone: true,
  templateUrl: "album.component.html",
})
export class AlbumComponent {
  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private translationService: TranslationService,
  ) {}

  readonly album$ = this.route.params.pipe(
    map((params) => parse(albumValidator, params)),
    switchMap(({ albumId }) =>
      combineLatest([
        this.musicService.getAlbumById(albumId),
        this.translationService.translate("music:album"),
        this.translationService.translate("music:artist"),
        this.translationService.translate("common:duration"),
        this.translationService.translate("common:genre"),
        this.translationService.translate("common:year"),
        this.translationService.translate("common:unknown"),
      ]).pipe(
        map(([{ albumdetails }, ...translations]) => ({
          albumdetails,
          translations,
        })),
      ),
    ),
    switchMap(({ albumdetails, translations }) =>
      this.musicService
        .getSongsByAlbum({
          artist: albumdetails.artist,
          album: albumdetails.title,
          year: albumdetails.year,
        })
        .pipe(map(({ songs }) => ({ albumdetails, songs, translations }))),
    ),
    map(
      ({
        albumdetails,
        songs,
        translations: [
          albumLabel,
          artistLabel,
          durationLabel,
          genreLabel,
          yearLabel,
          unknownLabel,
        ],
      }) => ({
        ...albumdetails,
        songs,
        details: [
          {
            header: albumLabel,
            description: albumdetails.label || unknownLabel,
          },
          {
            header: artistLabel,
            description: albumdetails.artist?.join(", ") || unknownLabel,
          },
          {
            header: durationLabel,
            description:
              getVideoDuration(
                songs.reduce((total, song) => total + (song.duration || 0), 0),
              ) || unknownLabel,
          },
          {
            header: genreLabel,
            description: albumdetails.genre?.join(", ") || unknownLabel,
          },
          {
            header: yearLabel,
            description: albumdetails.year?.toString() || unknownLabel,
          },
        ],
      }),
    ),
    tap((album) => this.titleService.setRawTitle(album.label)),
  );
}
