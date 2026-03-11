import { assertInInjectionContext, inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { parse } from "valibot";

import type {
  GridData,
  GridItem,
} from "@vapour/components/grid/grid.component";
import { VideoDetailsTVShow } from "@vapour/schema/video";
import { TvService } from "@vapour/services/tv.service";
import { pageValidator } from "@vapour/validators";

export async function getTvShowsInProgressResolver(): Promise<GridData> {
  assertInInjectionContext(getTvShowsInProgressResolver);

  const tvService = inject(TvService);

  const { limits, tvshows } = await tvService.getTvShowsInProgress();

  return {
    currentPage: 1,
    items: tvshows.map(mapTvShowToGridItem),
    limits,
    thumbnailType: "tvShow",
  };
}

export async function getTvShowsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(getTvShowsResolver);

  const tvService = inject(TvService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, tvshows } = await tvService.getTvShows(query.page);

  return {
    currentPage: query.page,
    items: tvshows.map(mapTvShowToGridItem),
    limits,
    thumbnailType: "tvShow",
  };
}

function mapTvShowToGridItem(tvshow: VideoDetailsTVShow): GridItem {
  return {
    id: tvshow.tvshowid,
    details: [tvshow.season, tvshow.episode],
    label: tvshow.title ?? tvshow.label,
    thumbnail: tvshow.art?.poster ?? tvshow.thumbnail,
    played: tvshow.watchedepisodes === tvshow.episode,
    url: `/tv/${tvshow.tvshowid.toString()}`,
  };
}
