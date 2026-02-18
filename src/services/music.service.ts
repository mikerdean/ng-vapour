import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";
import type {
  AlbumsPaged,
  ArtistsPaged,
  GetAlbum,
  GetAlbumQuery,
  GetAlbumsQuery,
  GetArtist,
  GetArtistQuery,
  GetArtistsQuery,
  GetMusicGenresQuery,
  GetSong,
  GetSongQuery,
  GetSongsQuery,
  MusicGenresPaged,
  RecentlyAddedAlbumsQuery,
  SongsPaged,
} from "@vapour/shared/kodi/audio";
import { KodiMessageFilterOfType } from "@vapour/shared/kodi/message";

@Injectable({ providedIn: "root" })
export class MusicService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getAlbums(page = 1): Observable<AlbumsPaged> {
    return this.socketService.send<GetAlbumsQuery, AlbumsPaged>(
      "AudioLibrary.GetAlbums",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "artist", "genre", "title", "year"],
        sort: { method: "title", order: "ascending" },
      },
    );
  }

  getAlbumsByAlbumArtist(albumartist: string): Observable<AlbumsPaged> {
    return this.socketService.send<GetAlbumsQuery, AlbumsPaged>(
      "AudioLibrary.GetAlbums",
      {
        filter: { field: "albumartist", operator: "is", value: albumartist },
        properties: ["art", "artist", "genre", "title", "year"],
        sort: { method: "year", order: "ascending" },
      },
    );
  }

  getAlbumById(id: number): Observable<GetAlbum> {
    return this.socketService.send<GetAlbumQuery, GetAlbum>(
      "AudioLibrary.GetAlbumDetails",
      {
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
      },
    );
  }

  getArtists(page = 1): Observable<ArtistsPaged> {
    return this.socketService.send<GetArtistsQuery, ArtistsPaged>(
      "AudioLibrary.GetArtists",
      {
        albumartistsonly: true,
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "songgenres"],
        sort: { method: "label", order: "ascending", ignorearticle: true },
      },
    );
  }

  getArtistsByGenre(genre: string, page = 1): Observable<ArtistsPaged> {
    return this.socketService.send<GetArtistsQuery, ArtistsPaged>(
      "AudioLibrary.GetArtists",
      {
        albumartistsonly: true,
        filter: {
          field: "genre",
          operator: "is",
          value: genre,
        },
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "songgenres"],
        sort: { method: "label", order: "ascending", ignorearticle: true },
      },
    );
  }

  getArtistById(id: number): Observable<GetArtist> {
    return this.socketService.send<GetArtistQuery, GetArtist>(
      "AudioLibrary.GetArtistDetails",
      {
        artistid: id,
        properties: ["art", "description"],
      },
    );
  }

  getMusicGenres(page = 1): Observable<MusicGenresPaged> {
    return this.socketService.send<GetMusicGenresQuery, MusicGenresPaged>(
      "AudioLibrary.GetGenres",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["thumbnail"],
        sort: { method: "label", order: "ascending" },
      },
    );
  }

  getRecentlyAddedAlbums(): Observable<AlbumsPaged> {
    return this.socketService.send<RecentlyAddedAlbumsQuery, AlbumsPaged>(
      "AudioLibrary.GetRecentlyAddedAlbums",
      {
        properties: ["art", "artist", "genre", "title", "year"],
      },
    );
  }

  getSongById(id: number): Observable<GetSong> {
    return this.socketService.send<GetSongQuery, GetSong>(
      "AudioLibrary.GetSongDetails",
      {
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
      },
    );
  }

  getSongs(page = 1): Observable<SongsPaged> {
    return this.socketService.send<GetSongsQuery, SongsPaged>(
      "AudioLibrary.GetSongs",
      {
        limits: this.configurationService.getPageLimits(page),
        properties: ["art", "disc", "duration", "track", "title", "year"],
        sort: { method: "track", order: "ascending" },
      },
    );
  }

  getSongsByAlbum(filter: {
    artist?: string | string[];
    album?: string;
    year?: number;
  }): Observable<SongsPaged> {
    const and: KodiMessageFilterOfType[] = [];

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

    return this.socketService.send<GetSongsQuery, SongsPaged>(
      "AudioLibrary.GetSongs",
      {
        filter: { and },
        properties: ["art", "disc", "duration", "track", "title", "year"],
        sort: { method: "year", order: "ascending" },
      },
    );
  }
}
