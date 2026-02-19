import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { combineLatest, interval, map, startWith } from "rxjs";

import type { Time } from "@vapour/shared/kodi/notifications";

const getTotalSeconds = ({ hours, minutes, seconds }: Time): number => {
  return hours * 3600 + minutes * 60 + seconds;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  selector: "progress-bar",
  templateUrl: "progress-bar.component.html",
})
export class ProgressBarComponent {
  readonly speed = input.required<number>();
  readonly start = input.required<Time>();
  readonly total = input.required<Time>();

  readonly percentage$ = combineLatest([
    toObservable(this.speed),
    toObservable(this.start),
    toObservable(this.total),
    interval(1000).pipe(startWith(0)),
  ]).pipe(
    map(([, start, total, offset]) => {
      const percentage =
        ((getTotalSeconds(start) + offset + 1) / getTotalSeconds(total)) * 100;

      return `${percentage.toString()}%`;
    }),
  );
}
