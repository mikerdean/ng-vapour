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
import type { GridItem } from "./grid.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    RouterLink,
    ThumbnailComponent,
  ],
  standalone: true,
  selector: "grid",
  templateUrl: "grid.component.html",
})
export class GridComponent implements OnInit {
  @Input({ required: true }) expectedItems!: number;
  @Input({ required: true }) items$!: Observable<(GridItem | null)[]>;
  @Input({ required: true }) thumbnailType!: ThumbnailType;

  gridItems$!: Observable<(GridItem | null)[]>;

  ngOnInit(): void {
    const emptyItems = of(
      Array.from({ length: this.expectedItems }, () => null),
    );

    this.gridItems$ = emptyItems.pipe(
      takeUntil(this.items$),
      concatWith(this.items$),
    );
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
}