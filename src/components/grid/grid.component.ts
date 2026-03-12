import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type Signal,
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

export type GridData = {
  currentPage: number;
  items: GridItem[];
  limits: InferOutput<typeof kodiLimitsWithTotal>;
  thumbnailType: ThumbnailType;
};

export type GridItem = {
  id: string | number;
  details: GridItemDetail[];
  label: string;
  played?: boolean;
  thumbnail?: string;
  url: string;
};

export type GridItemDetail = Signal<string | number | undefined | null>;

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
  readonly grid = input.required<GridData>();

  readonly icons = {
    options: faEllipsisVertical,
  };

  readonly tallThumbnail = computed(() => {
    const grid = this.grid();

    switch (grid.thumbnailType) {
      case "movie":
      case "season":
      case "movieSet":
      case "tvShow":
        return true;

      default:
        return false;
    }
  });

  onItemClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
}
