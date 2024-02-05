import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import type { GetMovies, GetMoviesQuery } from "../shared/kodi";
import { SocketService } from "./socket.service";

@Injectable({ providedIn: "root" })
export class MoviesService {
  constructor(private socketService: SocketService) {}

  getRecentlyAddedMovies(): Observable<GetMovies> {
    return this.socketService.send<GetMoviesQuery, GetMovies>(
      "VideoLibrary.GetRecentlyAddedMovies",
      {
        properties: ["art", "playcount", "runtime", "set", "title", "year"],
      },
    );
  }
}
