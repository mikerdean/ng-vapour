import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, map, switchMap, tap } from "rxjs";
import { parse } from "valibot";

import { DefinitionListComponent } from "@vapour/components/core/definition-list.component";
import { FanartComponent } from "@vapour/components/images/fanart.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { EpisodeListComponent } from "@vapour/components/views/tv/episode-list.component";
import { TitleService } from "@vapour/services/title.service";
import { TranslationService } from "@vapour/services/translation.service";
import { TvService } from "@vapour/services/tv.service";
import { getVideoDuration } from "@vapour/shared/duration";
import { seasonValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    DefinitionListComponent,
    EpisodeListComponent,
    FanartComponent,
    ThumbnailComponent,
  ],
  selector: "season",
  standalone: true,
  templateUrl: "season.component.html",
})
export class SeasonComponent {
  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private translationService: TranslationService,
    private tvService: TvService,
  ) {}

  readonly season$ = this.route.params.pipe(
    map((params) => parse(seasonValidator, params)),
    switchMap(({ seasonId }) =>
      combineLatest([
        this.tvService.getSeasonById(seasonId),
        this.translationService.translate("common:duration"),
        this.translationService.translate("tv:season"),
        this.translationService.translate("common:unknown"),
      ]).pipe(
        map(([{ seasondetails }, ...translations]) => ({
          seasondetails,
          translations,
        })),
      ),
    ),
    switchMap(({ seasondetails, translations }) =>
      this.tvService
        .getEpisodeByTvShowSeason(seasondetails.tvshowid, seasondetails.season)
        .pipe(
          map(({ episodes }) => ({ episodes, seasondetails, translations })),
        ),
    ),
    map(
      ({
        episodes,
        seasondetails,
        translations: [duration, season, unknown],
      }) => ({
        ...seasondetails,
        episodes,
        details: [
          {
            header: season,
            description: seasondetails.season.toString(),
          },
          {
            header: duration,
            description:
              getVideoDuration(
                episodes.reduce(
                  (total, episode) => total + (episode.runtime || 0),
                  0,
                ),
              ) || unknown,
          },
        ],
      }),
    ),
    tap((season) =>
      this.titleService.setRawTitle(`${season.showtitle} - ${season.label}`),
    ),
  );
}
