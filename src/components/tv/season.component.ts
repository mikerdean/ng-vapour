import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import {
  DefinitionListComponent,
  DefinitionListItem,
} from "@vapour/components/core/definition-list.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { EpisodeListComponent } from "@vapour/components/tv/episode-list.component";
import { VideoDetailsEpisode, VideoDetailsSeason } from "@vapour/schema/video";
import { getVideoDuration } from "@vapour/shared/duration";
import { translate } from "@vapour/signals/translate";

type SeasonDetails = {
  details: VideoDetailsSeason;
  episodes: VideoDetailsEpisode[];
};

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
  readonly season = input.required<SeasonDetails>();

  readonly translations = translate({
    duration: "common.duration",
    genre: "common.genre",
    rating: "common.rating",
    season: "tv.season",
    unknown: "common.unknown",
    year: "common.year",
  });

  readonly seasonDetails = computed<DefinitionListItem[]>(() => {
    const season = this.season();

    return [
      {
        header: this.translations.season(),
        description: season.details.title ?? season.details.label,
      },
      {
        header: this.translations.duration(),
        description:
          getVideoDuration(
            season.episodes.reduce(
              (total, episode) => total + (episode.runtime || 0),
              0,
            ),
          ) || this.translations.unknown(),
      },
    ];
  });
}
