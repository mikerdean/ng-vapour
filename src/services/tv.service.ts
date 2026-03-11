import { Injectable } from "@angular/core";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class TvService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getEpisodeById(id: number) {
    return this.socketService.send("VideoLibrary.GetEpisodeDetails", {
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
    });
  }

  getEpisodeByTvShowSeason(tvshowid: number, season: number) {
    return this.socketService.send("VideoLibrary.GetEpisodes", {
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
    });
  }

  getRecentlyAddedEpisodes() {
    return this.socketService.send("VideoLibrary.GetRecentlyAddedEpisodes", {
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
    });
  }

  getSeasonById(id: number) {
    return this.socketService.send("VideoLibrary.GetSeasonDetails", {
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
    });
  }

  getSeasonsByTvShowId(tvshowid: number) {
    return this.socketService.send("VideoLibrary.GetSeasons", {
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
    });
  }

  getTvShowById(id: number) {
    return this.socketService.send("VideoLibrary.GetTVShowDetails", {
      properties: [
        "art",
        "episode",
        "season",
        "title",
        "watchedepisodes",
        "year",
      ],
      tvshowid: id,
    });
  }

  getTvShowsByGenre(genre: string, page = 1) {
    return this.socketService.send("VideoLibrary.GetTVShows", {
      filter: { field: "genre", operator: "is", value: genre },
      limits: this.configurationService.getPageLimits(page),
      properties: ["art", "episode", "title", "watchedepisodes", "year"],
      sort: { method: "title", order: "ascending" },
    });
  }

  getTvShowGenres(page = 1) {
    return this.socketService.send("VideoLibrary.GetGenres", {
      limits: this.configurationService.getPageLimits(page),
      properties: ["thumbnail"],
      sort: { method: "label", order: "ascending" },
      type: "tvshow",
    });
  }

  getTvShows(page = 1) {
    return this.socketService.send("VideoLibrary.GetTVShows", {
      limits: this.configurationService.getPageLimits(page),
      properties: [
        "art",
        "episode",
        "season",
        "title",
        "watchedepisodes",
        "year",
      ],
      sort: { method: "title", order: "ascending" },
    });
  }

  getTvShowsInProgress() {
    return this.socketService.send("VideoLibrary.GetInProgressTVShows", {
      properties: ["art", "episode", "title", "watchedepisodes", "year"],
      sort: { method: "title", order: "ascending" },
    });
  }
}
