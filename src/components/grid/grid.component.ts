import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { concatWith, Observable, of, takeUntil } from "rxjs";

import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { ThumbnailComponent } from "../images/thumbnail.component";
import { ThumbnailType } from "../images/thumbnail.types";
import type { GridData } from "./grid.types";
import { PaginationComponent } from "./pagination.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    PaginationComponent,
    RouterLink,
    ThumbnailComponent,
  ],
  standalone: true,
  selector: "grid",
  templateUrl: "grid.component.html",
})
export class GridComponent implements OnInit {
  @Input({ required: true }) data$!: Observable<GridData>;
  @Input({ required: true }) expectedItems!: number;
  @Input({ required: true }) thumbnailType!: ThumbnailType;

  grid$!: Observable<GridData>;

  ngOnInit(): void {
    const emptyItems = of<GridData>({
      currentPage: 1,
      items: Array.from({ length: this.expectedItems }, () => null),
    });

    this.grid$ = emptyItems.pipe(takeUntil(this.data$), concatWith(this.data$));
  }

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
