import { Injectable } from "@angular/core";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class MoviesService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getRecentlyAddedMovies() {
    return this.socketService.send("VideoLibrary.GetRecentlyAddedMovies", {
      properties: ["art", "playcount", "runtime", "set", "title", "year"],
    });
  }

  getMovieById(id: number) {
    return this.socketService.send("VideoLibrary.GetMovieDetails", {
      movieid: id,
      properties: [
        "art",
        "cast",
        "director",
        "genre",
        "playcount",
        "plot",
        "rating",
        "runtime",
        "set",
        "tag",
        "title",
        "writer",
        "year",
      ],
    });
  }

  getMovieGenres(page = 1) {
    return this.socketService.send("VideoLibrary.GetGenres", {
      limits: this.configurationService.getPageLimits(page),
      properties: ["thumbnail"],
      sort: { method: "label", order: "ascending" },
      type: "movie",
    });
  }

  getMovies(page = 1) {
    return this.socketService.send("VideoLibrary.GetMovies", {
      limits: this.configurationService.getPageLimits(page),
      properties: ["art", "playcount", "runtime", "set", "title", "year"],
      sort: { method: "title", order: "ascending" },
    });
  }

  getMoviesByGenre(genre: string, page = 1) {
    return this.socketService.send("VideoLibrary.GetMovies", {
      filter: { field: "genre", operator: "is", value: genre },
      limits: this.configurationService.getPageLimits(page),
      properties: ["art", "playcount", "runtime", "set", "title", "year"],
      sort: { method: "title", order: "ascending" },
    });
  }

  getMoviesInSets() {
    return this.socketService.send("VideoLibrary.GetMovies", {
      filter: {
        field: "set",
        operator: "isnot",
        value: "",
      },
      properties: ["set"],
      sort: { method: "title", order: "ascending" },
    });
  }

  getMovieSetById(id: number) {
    return this.socketService.send("VideoLibrary.GetMovieSetDetails", {
      movies: {
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "year", order: "ascending" },
      },
      properties: ["art", "playcount", "title"],
      setid: id,
    });
  }

  getMovieSets(page = 1) {
    return this.socketService.send("VideoLibrary.GetMovieSets", {
      limits: this.configurationService.getPageLimits(page),
      properties: ["art", "playcount", "title"],
      sort: { method: "title", order: "ascending" },
    });
  }
}
