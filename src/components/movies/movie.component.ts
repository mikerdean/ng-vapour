import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { faPlayCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { parse } from "valibot";

import {
  DefinitionListComponent,
  type DefinitionListItem,
} from "@vapour/components/core/definition-list.component";
import { RatingComponent } from "@vapour/components/core/rating.component";
import {
  FormButtonSplitComponent,
  FormButtonSplitItem,
} from "@vapour/components/form/form-button-split.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { CastComponent } from "@vapour/components/movies/cast.component";
import { MoviesService } from "@vapour/services/movies.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { translate } from "@vapour/signals/translate";
import { movieValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CastComponent,
    DefinitionListComponent,
    FanartComponent,
    FormButtonSplitComponent,
    RatingComponent,
    ThumbnailComponent,
  ],
  selector: "movie",
  templateUrl: "movie.component.html",
})
export class MovieComponent {
  readonly #movieService = inject(MoviesService);
  readonly #route = inject(ActivatedRoute);

  readonly params = toSignal(this.#route.params);

  readonly movie = resource({
    loader: async ({ params }) => {
      const { moviedetails } = await this.#movieService.getMovieById(
        params.movieId,
      );

      return moviedetails;
    },
    params: () => parse(movieValidator, this.params()),
  });

  readonly translations = translate({
    director: "common.director",
    duration: "common.duration",
    genre: "common.genre",
    rating: "common.rating",
    unknown: "common.unknown",
    writer: "common.writer",
    year: "common.year",
  });

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

  readonly movieDetails = computed<DefinitionListItem[]>(() => {
    const movie = this.movie.value();
    if (!movie) {
      return [];
    }

    return [
      {
        header: this.translations.duration(),
        description:
          getVideoDuration(movie.runtime || -1) ?? this.translations.unknown(),
      },
      {
        header: this.translations.genre(),
        description: movie.genre?.join(", ") ?? this.translations.unknown(),
      },
      {
        header: this.translations.director(),
        description: movie.director?.join(", ") ?? this.translations.unknown(),
      },
      {
        header: this.translations.writer(),
        description: movie.writer?.join(", ") ?? this.translations.unknown(),
      },
      {
        header: this.translations.year(),
        description: movie.year?.toString() ?? this.translations.unknown(),
      },
    ];
  });
}
