import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { GridData } from "@vapour/components/grid/grid.types";
import { PaginationComponent } from "@vapour/components/grid/pagination.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { ThumbnailType } from "@vapour/components/images/thumbnail.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    PaginationComponent,
    RouterLink,
    ThumbnailComponent,
  ],
  standalone: true,
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
