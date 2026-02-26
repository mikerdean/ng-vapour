import { inject, Injectable } from "@angular/core";

import type { KodiFilter } from "@vapour/schema/base";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class MusicService {
  readonly #configurationService = inject(ConfigurationService);
  readonly #socketService = inject(SocketService);

  getAlbums(page = 1) {
    return this.#socketService.send("AudioLibrary.GetAlbums", {
      limits: this.#configurationService.getPageLimits(page),
      properties: ["art", "artist", "genre", "title", "year"],
      sort: { method: "title", order: "ascending" },
    });
  }

  getAlbumsByAlbumArtist(albumartist: string) {
    return this.#socketService.send("AudioLibrary.GetAlbums", {
      filter: { field: "albumartist", operator: "is", value: albumartist },
      properties: ["art", "artist", "genre", "title", "year"],
      sort: { method: "year", order: "ascending" },
    });
  }

  getAlbumById(id: number) {
    return this.#socketService.send("AudioLibrary.GetAlbumDetails", {
      albumid: id,
      properties: [
        "art",
        "artist",
        "description",
        "genre",
        "rating",
        "title",
        "year",
      ],
    });
  }

  getArtists(page = 1) {
    return this.#socketService.send("AudioLibrary.GetArtists", {
      albumartistsonly: true,
      limits: this.#configurationService.getPageLimits(page),
      properties: ["art", "songgenres"],
      sort: { method: "label", order: "ascending", ignorearticle: true },
    });
  }

  getArtistsByGenre(genre: string, page = 1) {
    return this.#socketService.send("AudioLibrary.GetArtists", {
      albumartistsonly: true,
      filter: {
        field: "genre",
        operator: "is",
        value: genre,
      },
      limits: this.#configurationService.getPageLimits(page),
      properties: ["art", "songgenres"],
      sort: { method: "label", order: "ascending", ignorearticle: true },
    });
  }

  getArtistById(id: number) {
    return this.#socketService.send("AudioLibrary.GetArtistDetails", {
      artistid: id,
      properties: ["art", "description"],
    });
  }

  getMusicGenres(page = 1) {
    return this.#socketService.send("AudioLibrary.GetGenres", {
      limits: this.#configurationService.getPageLimits(page),
      properties: ["thumbnail"],
      sort: { method: "label", order: "ascending" },
    });
  }

  getRecentlyAddedAlbums() {
    return this.#socketService.send("AudioLibrary.GetRecentlyAddedAlbums", {
      properties: ["art", "artist", "genre", "title", "year"],
    });
  }

  getSongById(id: number) {
    return this.#socketService.send("AudioLibrary.GetSongDetails", {
      properties: [
        "album",
        "albumartist",
        "artist",
        "art",
        "disc",
        "duration",
        "track",
        "title",
        "year",
      ],
      songid: id,
    });
  }

  getSongs(page = 1) {
    return this.#socketService.send("AudioLibrary.GetSongs", {
      limits: this.#configurationService.getPageLimits(page),
      properties: ["art", "disc", "duration", "track", "title", "year"],
      sort: { method: "track", order: "ascending" },
    });
  }

  getSongsByAlbum(filter: {
    artist?: string | string[];
    album?: string;
    year?: number;
  }) {
    const and: KodiFilter[] = [];

    if (filter.artist) {
      and.push({
        field: "albumartist",
        operator: "is",
        value: filter.artist,
      });
    }

    if (filter.album) {
      and.push({ field: "album", operator: "is", value: filter.album });
    }

    if (filter.year) {
      and.push({
        field: "year",
        operator: "is",
        value: (filter.year || 0).toString(),
      });
    }

    return this.#socketService.send("AudioLibrary.GetSongs", {
      filter: { and },
      properties: ["art", "disc", "duration", "track", "title", "year"],
      sort: { method: "year", order: "ascending" },
    });
  }
}
