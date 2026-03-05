import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";

import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import type { VideoCast } from "@vapour/schema/video";
import { translate } from "@vapour/signals/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormButtonComponent, ThumbnailComponent],
  selector: "cast",
  templateUrl: "cast.component.html",
})
export class CastComponent {
  readonly cast = input.required<VideoCast[]>();
  readonly castPerPage = input(6);
  readonly page = signal(1);

  readonly maxCast = computed(() => this.page() * this.castPerPage());

  readonly pagedCast = computed(() =>
    this.cast()
      .filter((actor) => actor.thumbnail)
      .slice(0, this.maxCast()),
  );

  readonly showMore = computed(() => {
    const filteredCast = this.cast().filter((actor) => actor.thumbnail);
    return this.maxCast() < filteredCast.length;
  });

  readonly translations = translate({
    showMoreCast: "movies.showMoreCast",
  });

  incrementPage() {
    this.page.update((i) => i + 1);
  }
}
