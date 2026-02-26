import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import type { InferOutput } from "valibot";

import { PaginationComponent } from "@vapour/components/grid/pagination.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import {
  ThumbnailComponent,
  type ThumbnailType,
} from "@vapour/components/images/thumbnail.component";
import type { kodiLimitsWithTotal } from "@vapour/schema/base";

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
  readonly data = input.required<GridData | null>();
  readonly thumbnailType = input.required<ThumbnailType>();

  readonly icons = {
    options: faEllipsisVertical,
  };

  readonly tallThumbnail = computed(() => {
    const type = this.thumbnailType();

    return (
      type === "movie" ||
      type === "movieSet" ||
      type === "season" ||
      type === "tvShow"
    );
  });

  onItemClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
}
