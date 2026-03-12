import {
  assertInInjectionContext,
  inject,
  Injector,
  runInInjectionContext,
} from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { parse } from "valibot";

import type {
  GridData,
  GridItem,
} from "@vapour/components/grid/grid.component";
import {
  VideoDetailsTVShow,
  type VideoDetailsSeason,
} from "@vapour/schema/video";
import { TvService } from "@vapour/services/tv.service";
import { translateOne } from "@vapour/signals/translate";
import { pageValidator, tvShowValidator } from "@vapour/validators";

export async function getTvShowsInProgressResolver(): Promise<GridData> {
  assertInInjectionContext(getTvShowsInProgressResolver);

  const injector = inject(Injector);
  const tvService = inject(TvService);

  const { limits, tvshows } = await tvService.getTvShowsInProgress();

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: tvshows.map(mapTvShowToGridItem),
    limits,
    thumbnailType: "tvShow",
  }));
}

export async function getTvShowsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(getTvShowsResolver);

  const injector = inject(Injector);
  const tvService = inject(TvService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, tvshows } = await tvService.getTvShows(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: tvshows.map(mapTvShowToGridItem),
    limits,
    thumbnailType: "tvShow",
  }));
}

export async function getTvShowSeasonsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(getTvShowSeasonsResolver);

  const injector = inject(Injector);
  const tvService = inject(TvService);
  const params = parse(tvShowValidator, route.params);

  const { limits, seasons } = await tvService.getSeasonsByTvShowId(
    params.tvShowId,
  );

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: seasons.map(mapSeasonToGridItem),
    limits,
    thumbnailType: "season",
  }));
}

function mapTvShowToGridItem(tvshow: VideoDetailsTVShow): GridItem {
  return {
    id: tvshow.tvshowid,
    details: [
      translateOne("tv.seasonCount", () => ({ count: tvshow.season })),
      translateOne("tv.episodeCount", () => ({ count: tvshow.episode })),
    ],
    label: tvshow.title ?? tvshow.label,
    thumbnail: tvshow.art?.poster ?? tvshow.thumbnail,
    played: tvshow.watchedepisodes === tvshow.episode,
    url: `/tv/${tvshow.tvshowid.toString()}`,
  };
}

function mapSeasonToGridItem(season: VideoDetailsSeason): GridItem {
  return {
    id: season.seasonid,
    details: [
      translateOne("tv.episodeCount", () => ({ count: season.episode })),
    ],
    label: season.title ?? season.label,
    thumbnail: season.art?.poster ?? season.thumbnail,
    played: season.watchedepisodes === season.episode,
    url: `/tv/${season.tvshowid?.toString() ?? ""}/seasons/${season.season.toString()}`,
  };
}
