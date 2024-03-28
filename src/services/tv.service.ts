import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";
import type {
  GetEpisode,
  GetEpisodeQuery,
  GetEpisodes,
  GetEpisodesQuery,
  GetRecentEpisodesQuery,
  GetSeason,
  GetSeasonDetailsQuery,
  GetSeasons,
  GetSeasonsQuery,
  GetTVShow,
  GetTVShowDetailsQuery,
  GetTVShows,
  GetTVShowsQuery,
  GetVideoGenresQuery,
  VideoGenresPaged,
} from "@vapour/shared/kodi";

@Injectable({ providedIn: "root" })
export class TvService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getEpisodeById(id: number): Observable<GetEpisode> {
    return this.socketService.send<GetEpisodeQuery, GetEpisode>(
      "VideoLibrary.GetEpisodeDetails",
      {
        properties: [
          "art",
          "dateadded",
          "episode",
          "firstaired",
          "playcount",
          "plot",
          "rating",
          "runtime",
          "season",
          "showtitle",
          "title",
          "tvshowid",
        ],
        episodeid: id,
      },
    );
  }

  getEpisodeByTvShowSeason(
    tvshowid: number,
    season: number,
  ): Observable<GetEpisodes> {
    return this.socketService.send<GetEpisodesQuery, GetEpisodes>(
      "VideoLibrary.GetEpisodes",
      {
        properties: [
          "art",
          "episode",
          "firstaired",
          "playcount",
          "rating",
          "runtime",
          "season",
          "title",
          "tvshowid",
        ],
        sort: { method: "episode", order: "ascending" },
        season,
        tvshowid,
      },
    );
  }

  getRecentlyAddedEpisodes(): Observable<GetEpisodes> {
    return this.socketService.send<GetRecentEpisodesQuery, GetEpisodes>(
      "VideoLibrary.GetRecentlyAddedEpisodes",
      {
        properties: [
          "art",
          "episode",
          "playcount",
          "rating",
          "runtime",
          "season",
          "showtitle",
          "title",
          "tvshowid",
        ],
        sort: { method: "dateadded", order: "descending" },
      },
    );
  }

  getSeasonById(id: number): Observable<GetSeason> {
    return this.socketService.send<GetSeasonDetailsQuery, GetSeason>(
      "VideoLibrary.GetSeasonDetails",
      {
        properties: [
          "art",
          "episode",
          "season",
          "showtitle",
          "title",
          "tvshowid",
          "userrating",
          "watchedepisodes",
        ],
        seasonid: id,
      },
    );
  }

  getSeasonsByTvShowId(tvshowid: number): Observable<GetSeasons> {
    return this.socketService.send<GetSeasonsQuery, GetSeasons>(
      "VideoLibrary.GetSeasons",
      {
        properties: [
          "art",
          "episode",
          "season",
          "title",
          "userrating",
          "watchedepisodes",
        ],
        sort: { method: "title", order: "ascending" },
        tvshowid,
      },
    );
  }

  getTvShowById(id: number): Observable<GetTVShow> {
    return this.socketService.send<GetTVShowDetailsQuery, GetTVShow>(
      "VideoLibrary.GetTVShowDetails",
      {
        properties: [
          "art",
          "episode",
          "season",
          "title",
          "watchedepisodes",
          "year",
        ],
        tvshowid: id,
      },
    );
  }

  getTvShowsByGenre(genre: string, page = 1): Observable<GetTVShows> {
    return this.socketService.send<GetTVShowsQuery, GetTVShows>(
      "VideoLibrary.GetTVShows",
      {
        filter: { field: "genre", operator: "is", value: genre },
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getTvShowGenres(page = 1): Observable<VideoGenresPaged> {
    return this.socketService.send<GetVideoGenresQuery, VideoGenresPaged>(
      "VideoLibrary.GetGenres",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
        type: "tvshow",
      },
    );
  }

  getTvShows(page = 1): Observable<GetTVShows> {
    return this.socketService.send<GetTVShowsQuery, GetTVShows>(
      "VideoLibrary.GetTVShows",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getTvShowsInProgress(): Observable<GetTVShows> {
    return this.socketService.send<GetTVShowsQuery, GetTVShows>(
      "VideoLibrary.GetInProgressTVShows",
      {
        properties: ["art", "episode", "title", "watchedepisodes", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }
}
