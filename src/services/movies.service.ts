import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";
import type {
  GetMovie,
  GetMovieQuery,
  GetMovies,
  GetMovieSet,
  GetMovieSetDetailsQuery,
  GetMovieSets,
  GetMovieSetsQuery,
  GetMoviesQuery,
  GetVideoGenresQuery,
  VideoGenresPaged,
} from "@vapour/shared/kodi/video";

@Injectable({ providedIn: "root" })
export class MoviesService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getRecentlyAddedMovies(): Observable<GetMovies> {
    return this.socketService.send<GetMoviesQuery, GetMovies>(
      "VideoLibrary.GetRecentlyAddedMovies",
      {
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
      },
    );
  }

  getMovieById(id: number): Observable<GetMovie> {
    return this.socketService.send<GetMovieQuery, GetMovie>(
      "VideoLibrary.GetMovieDetails",
      {
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
      },
    );
  }

  getMovieGenres(page = 1): Observable<VideoGenresPaged> {
    return this.socketService.send<GetVideoGenresQuery, VideoGenresPaged>(
      "VideoLibrary.GetGenres",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
        type: "movie",
      },
    );
  }

  getMovies(page = 1): Observable<GetMovies> {
    return this.socketService.send<GetMoviesQuery, GetMovies>(
      "VideoLibrary.GetMovies",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getMoviesByGenre(genre: string, page = 1): Observable<GetMovies> {
    return this.socketService.send<GetMoviesQuery, GetMovies>(
      "VideoLibrary.GetMovies",
      {
        filter: { field: "genre", operator: "is", value: genre },
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getMoviesInSets(): Observable<GetMovies> {
    return this.socketService.send<GetMoviesQuery, GetMovies>(
      "VideoLibrary.GetMovies",
      {
        filter: {
          field: "set",
          operator: "isnot",
          value: "",
        },
        properties: ["set"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getMovieSetById(id: number): Observable<GetMovieSet> {
    return this.socketService.send<GetMovieSetDetailsQuery, GetMovieSet>(
      "VideoLibrary.GetMovieSetDetails",
      {
        movies: {
          properties: ["art", "playcount", "runtime", "set", "title", "year"],
          sort: { method: "year", order: "ascending" },
        },
        properties: ["art", "playcount", "title"],
        setid: id,
      },
    );
  }

  getMovieSets(page = 1): Observable<GetMovieSets> {
    return this.socketService.send<GetMovieSetsQuery, GetMovieSets>(
      "VideoLibrary.GetMovieSets",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "playcount", "title"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }
}
