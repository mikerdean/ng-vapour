import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import type { GridItem } from "@vapour/components/grid/grid.types";
import { TranslationService } from "@vapour/services/translation.service";
import { getVideoDuration } from "@vapour/shared/duration";
import type {
  AudioDetailsAlbum,
  AudioDetailsArtist,
  LibraryDetailsGenre,
  VideoDetailsEpisode,
  VideoDetailsMovie,
  VideoDetailsMovieSet,
  VideoDetailsTVShow,
} from "@vapour/shared/kodi";

@Injectable({ providedIn: "root" })
export class MappingService {
  constructor(private translationService: TranslationService) {}

  mapAlbumToGridItem(album: AudioDetailsAlbum): GridItem {
    return {
      id: album.albumid,
      details: [album.artist?.join(", "), album.year],
      label: album.label,
      thumbnail: album.art?.thumb,
      url: `/music/albums/${album.albumid}`,
    };
  }

  mapArtistToGridItem(artist: AudioDetailsArtist): GridItem {
    return {
      id: artist.artistid,
      details: [artist.songgenres?.map(({ title }) => title).join(", ")],
      label: artist.label,
      thumbnail: artist.art?.thumb,
      url: `/music/artists/${artist.artistid}`,
    };
  }

  mapGenreToGridItem(genre: LibraryDetailsGenre, type: string): GridItem {
    return {
      id: genre.genreid,
      details: [],
      label: genre.label,
      url: `/${type}/genres/${genre.label}`,
    };
  }

  mapMovieToGridItem(movie: VideoDetailsMovie): GridItem {
    return {
      id: movie.movieid,
      details: [movie.runtime && getVideoDuration(movie.runtime), movie.year],
      label: movie.label,
      played: movie.playcount !== undefined && movie.playcount > 0,
      thumbnail: movie.art?.poster,
      url: `/movies/${movie.movieid}`,
    };
  }

  mapMovieSetToGridItem(
    set: VideoDetailsMovieSet,
    count: number,
  ): Observable<GridItem> {
    return this.translationService
      .translate("movies:movieCount", { count })
      .pipe(
        map((countLabel) => ({
          id: set.setid,
          details: [countLabel],
          label: set.label,
          played: set.playcount !== undefined && set.playcount > 0,
          thumbnail: set.art?.poster,
          url: `/movies/sets/${set.setid}`,
        })),
      );
  }

  mapTvShowToGridItem(tvshow: VideoDetailsTVShow): Observable<GridItem> {
    return this.translationService
      .translate("tv:watchedEpisodes", {
        watched: tvshow.watchedepisodes || 0,
        total: tvshow.episode,
      })
      .pipe(
        map((watchedEpisodes) => ({
          id: tvshow.tvshowid,
          details: [watchedEpisodes, tvshow.year],
          label: tvshow.label,
          thumbnail: tvshow.art?.poster,
          url: `/tv/${tvshow.tvshowid}`,
        })),
      );
  }

  mapEpisodeToGridItem(episode: VideoDetailsEpisode): Observable<GridItem> {
    return this.translationService
      .translate("tv:seasonNumber", {
        season: episode.season,
      })
      .pipe(
        map((season) => ({
          id: episode.episodeid,
          details: [episode.showtitle, season],
          label: episode.label,
          thumbnail: episode.art?.thumb,
          url: `/tv/episodes/${episode.episodeid}`,
        })),
      );
  }
}
