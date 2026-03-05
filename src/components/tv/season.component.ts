import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { parse } from "valibot";

import {
  DefinitionListComponent,
  DefinitionListItem,
} from "@vapour/components/core/definition-list.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { EpisodeListComponent } from "@vapour/components/tv/episode-list.component";
import { VideoDetailsEpisode, VideoDetailsSeason } from "@vapour/schema/video";
import { TvService } from "@vapour/services/tv.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { translate } from "@vapour/signals/translate";
import { seasonValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DefinitionListComponent,
    EpisodeListComponent,
    FanartComponent,
    ThumbnailComponent,
  ],
  selector: "season",
  templateUrl: "season.component.html",
})
export class SeasonComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #tvService = inject(TvService);

  readonly params = toSignal(this.#route.params);

  readonly season = resource({
    loader: async ({ params }) => {
      const { seasondetails: season } = await this.#tvService.getSeasonById(
        params.seasonId,
      );

      const { episodes } = await this.#tvService.getEpisodeByTvShowSeason(
        season.tvshowid,
        season.season,
      );

      return {
        details: season,
        episodes,
      };
    },
    params: () => parse(seasonValidator, this.params()),
  });

  readonly translations = translate({
    duration: "common.duration",
    genre: "common.genre",
    rating: "common.rating",
    season: "tv.season",
    unknown: "common.unknown",
    year: "common.year",
  });

  getSeasonDetails(
    season: VideoDetailsSeason,
    episodes: VideoDetailsEpisode[],
  ): DefinitionListItem[] {
    return [
      {
        header: this.translations.season(),
        description: season.season.toString(),
      },
      {
        header: this.translations.duration(),
        description:
          getVideoDuration(
            episodes.reduce(
              (total, episode) => total + (episode.runtime || 0),
              0,
            ),
          ) || this.translations.unknown(),
      },
    ];
  }
}
