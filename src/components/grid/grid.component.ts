import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { type InferOutput } from "valibot";

import { PaginationComponent } from "@vapour/components/grid/pagination.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import {
  ThumbnailComponent,
  type ThumbnailType,
} from "@vapour/components/images/thumbnail.component";
import type { kodiLimitsWithTotal } from "@vapour/schema/base";
import { AddonService } from "@vapour/services/addons.service";
import { MoviesService } from "@vapour/services/movies.service";
import { MusicService } from "@vapour/services/music.service";
import { TvService } from "@vapour/services/tv.service";
import { routeParams, routeQuery } from "@vapour/signals/route";
import { gridValidator, pageValidator } from "@vapour/validators";

export type GridData = {
  currentPage: number;
  items: (GridItem | null)[];
  limits: InferOutput<typeof kodiLimitsWithTotal>;
};

export type GridItem = {
  id: string | number;
  details: GridItemDetail[];
  label: string;
  played?: boolean;
  thumbnail?: string;
  url: string;
};

export type GridItemDetail = string | number | boolean | undefined | null;

export type GridQuery = {
  page: number;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    PaginationComponent,
    RouterLink,
    ThumbnailComponent,
  ],
  selector: "grid",
  templateUrl: "grid.component.html",
})
export class GridComponent {
  readonly #addonService = inject(AddonService);
  readonly #moviesService = inject(MoviesService);
  readonly #musicService = inject(MusicService);
  readonly #tvService = inject(TvService);

  readonly icons = {
    options: faEllipsisVertical,
  };

  readonly #params = routeParams(gridValidator);
  readonly #query = routeQuery(pageValidator);

  readonly thumbnailType = computed<ThumbnailType>(() => {
    const params = this.#params();

    switch (params.type) {
      case "addons":
        return "addon";

      case "movies":
        return "movie";

      case "music": {
        switch (params.action) {
          case "artists":
            return "artist";
          default:
            return "album";
        }
      }

      case "tv": {
        switch (params.action) {
          case "seasons":
            return "season";
          default:
            return "tvShow";
        }
      }
    }
  });

  readonly tallThumbnail = computed(() => {
    const params = this.#params();

    switch (params.type) {
      case "movies":
      case "tv":
        return true;

      default:
        return false;
    }
  });

  readonly grid = resource({
    loader: async ({ params: { params, query } }) => {
      const gridData = await this.#fetchGridData(params, query);
      return gridData;
    },
    params: () => ({
      params: this.#params(),
      query: this.#query(),
    }),
  });

  async #fetchGridData(
    params: InferOutput<typeof gridValidator>,
    query: InferOutput<typeof pageValidator>,
  ): Promise<GridData> {
    switch (params.type) {
      case "addons": {
        const { addons, limits } = await this.#addonService.getAddons(
          query.page,
        );

        return {
          currentPage: query.page,
          items: addons.map((addon) => ({
            id: addon.addonid,
            label: addon.name ?? "unknown",
            details: [],
            thumbnail: addon.thumbnail,
            url: `/addons/${addon.addonid}`,
          })),
          limits,
        };
      }

      case "movies": {
        switch (params.action) {
          case "recent": {
            const { movies, limits } =
              await this.#moviesService.getRecentlyAddedMovies();

            return {
              currentPage: query.page,
              items: movies.map((movie) => ({
                id: movie.movieid,
                label: movie.title ?? movie.label,
                details: [],
                thumbnail: movie.art?.poster ?? movie.thumbnail,
                url: `/movies/${movie.movieid.toString()}`,
              })),
              limits,
            };
          }

          default:
            throw Error("Unknown action");
        }
      }

      case "music": {
        switch (params.action) {
          case "recent": {
            const { albums, limits } =
              await this.#musicService.getRecentlyAddedAlbums();

            return {
              currentPage: query.page,
              items: albums.map((album) => ({
                id: album.albumid,
                label: album.title ?? album.label,
                details: [],
                thumbnail: album.art?.thumb ?? album.thumbnail,
                url: `/music/album/${album.albumid.toString()}`,
              })),
              limits,
            };
          }

          default:
            throw Error("Unknown action");
        }
      }

      case "tv": {
        switch (params.action) {
          case "recent": {
            const { tvshows, limits } =
              await this.#tvService.getTvShowsInProgress();

            return {
              currentPage: query.page,
              items: tvshows.map((show) => ({
                id: show.tvshowid,
                label: show.title ?? show.label,
                details: [],
                thumbnail: show.thumbnail,
                url: "",
              })),
              limits,
            };
          }

          default:
            throw Error("Unknown action");
        }
      }

      default:
        throw Error("Unknown grid type");
    }
  }

  onItemClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
}
