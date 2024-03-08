import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { ThumbnailComponent } from "../images/thumbnail.component";
import { ThumbnailType } from "../images/thumbnail.types";
import type { GridData } from "./grid.types";
import { PaginationComponent } from "./pagination.component";

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
  @Input({ required: true }) data!: GridData | null;
  @Input({ required: true }) thumbnailType!: ThumbnailType;

  readonly icons = {
    options: faEllipsisVertical,
  };

  get tallThumbnail() {
    const type = this.thumbnailType;

    return (
      type === "movie" ||
      type === "movieSet" ||
      type === "season" ||
      type === "tvShow"
    );
  }

  onItemClick(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }
}
