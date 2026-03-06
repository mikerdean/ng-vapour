import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from "@angular/core";

import type { Time } from "@vapour/schema/base";

const getTotalSeconds = ({ hours, minutes, seconds }: Time): number => {
  return hours * 3600 + minutes * 60 + seconds;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "progress-bar",
  templateUrl: "progress-bar.component.html",
})
export class ProgressBarComponent {
  readonly speed = input.required<number>();
  readonly start = input.required<Time>();
  readonly total = input.required<Time>();

  readonly offset = signal(0);

  readonly percentage = computed(() => {
    const offset = this.offset();
    const start = this.start();
    const total = this.total();

    const percentage = Math.min(
      ((getTotalSeconds(start) + offset + 1) / getTotalSeconds(total)) * 100,
      100,
    );

    return `${percentage.toString()}%`;
  });

  readonly offsetEffect = effect((onCleanup) => {
    const speed = this.speed();
    const timeout = 1000 / speed;

    const timer = setInterval(() => {
      this.offset.update((i) => i + 1);
    }, timeout);

    onCleanup(() => {
      clearInterval(timer);
    });
  });
}
