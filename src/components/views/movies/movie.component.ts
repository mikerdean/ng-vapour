import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faPlayCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { combineLatest, map, switchMap, tap } from "rxjs";
import { parse } from "valibot";

import { DefinitionListComponent } from "@vapour/components/core/definition-list.component";
import { RatingComponent } from "@vapour/components/core/rating.component";
import {
  FormButtonSplitComponent,
  FormButtonSplitItem,
} from "@vapour/components/form/form-button-split.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { CastComponent } from "@vapour/components/views/movies/cast.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { MoviesService } from "@vapour/services/movies.service";
import { TitleService } from "@vapour/services/title.service";
import { TranslationService } from "@vapour/services/translation.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { movieValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CastComponent,
    DefinitionListComponent,
    FanartComponent,
    FormButtonSplitComponent,
    RatingComponent,
    ThumbnailComponent,
    TranslatePipe,
  ],
  standalone: true,
  selector: "movie",
  templateUrl: "movie.component.html",
})
export class MovieComponent {
  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private translationService: TranslationService,
  ) {}

  readonly movie$ = this.route.params.pipe(
    map((params) => parse(movieValidator, params)),
    switchMap(({ movieId }) =>
      combineLatest([
        this.movieService.getMovieById(movieId),
        this.translationService.translate("common:director"),
        this.translationService.translate("common:duration"),
        this.translationService.translate("common:genre"),
        this.translationService.translate("common:unknown"),
        this.translationService.translate("common:year"),
        this.translationService.translate("common:writer"),
      ]).pipe(
        map(([{ moviedetails }, ...translations]) => ({
          moviedetails,
          translations,
        })),
      ),
    ),
    map(
      ({
        moviedetails,
        translations: [director, duration, genre, unknown, year, writer],
      }) => ({
        ...moviedetails,
        details: [
          {
            header: duration,
            description: getVideoDuration(moviedetails.runtime || 0) || unknown,
          },
          {
            header: genre,
            description: moviedetails.genre?.join(", ") || unknown,
          },
          {
            header: director,
            description: moviedetails.director?.join(", ") || unknown,
          },
          {
            header: writer,
            description: moviedetails.writer?.join(", ") || unknown,
          },
          {
            header: year,
            description: moviedetails.year?.toString() || unknown,
          },
        ],
      }),
    ),
    tap((movie) => this.titleService.setRawTitle(movie.label)),
  );

  readonly buttonItems: FormButtonSplitItem[] = [
    {
      label: "Play",
      icon: faPlayCircle,
      action: () => {
        // play the movie here
      },
    },
    {
      label: "Add to playlist",
      icon: faPlusCircle,
      action: () => {
        // add the item to the playlist
      },
    },
  ];
}
