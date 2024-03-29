import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";

import type { GridItem } from "@vapour/components/grid/grid.types";
import { TranslationService } from "@vapour/services/translation.service";
import { getVideoDuration } from "@vapour/shared/duration";
import type {
  AddonDetails,
  AudioDetailsAlbum,
  AudioDetailsArtist,
  LibraryDetailsGenre,
  VideoDetailsEpisode,
  VideoDetailsMovie,
  VideoDetailsMovieSet,
  VideoDetailsSeason,
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
      played: (album.playcount || 0) > 0,
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

  mapSeasonToGridItem(season: VideoDetailsSeason): Observable<GridItem> {
    return combineLatest([
      this.translationService.translate("tv:episodeCount", {
        count: season.episode,
      }),
      this.translationService.translate("tv:seasonNumber", {
        season: season.season,
      }),
      this.translationService.translate("tv:watchedEpisodes", {
        watched: season.watchedepisodes || 0,
        count: season.episode,
      }),
    ]).pipe(
      map(([episodeCount, label, watchedEpisodes]) => ({
        id: season.seasonid,
        details: [episodeCount, watchedEpisodes],
        label,
        played: season.episode === season.watchedepisodes,
        thumbnail: season.art?.poster,
        url: `/tv/seasons/${season.seasonid}`,
      })),
    );
  }

  mapTvShowToGridItem(tvshow: VideoDetailsTVShow): Observable<GridItem> {
    return this.translationService
      .translate("tv:watchedEpisodes", {
        watched: tvshow.watchedepisodes || 0,
        count: tvshow.episode,
      })
      .pipe(
        map((watchedEpisodes) => ({
          id: tvshow.tvshowid,
          details: [watchedEpisodes, tvshow.year],
          label: tvshow.label,
          played: tvshow.watchedepisodes === tvshow.episode,
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
          played: (episode.playcount || 0) > 0,
          thumbnail: episode.art?.thumb,
          url: `/tv/episodes/${episode.episodeid}`,
        })),
      );
  }

  mapAddonToGridItem(addon: AddonDetails): GridItem {
    return {
      id: addon.addonid,
      details: [addon.author],
      label: addon.name || "",
      played: addon.enabled,
      thumbnail: addon.thumbnail,
      url: `/addons/${addon.addonid}`,
    };
  }
}
