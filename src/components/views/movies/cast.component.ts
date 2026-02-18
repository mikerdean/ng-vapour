import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";

import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { ThumbnailComponent } from "@vapour/components/images/thumbnail.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { VideoDetailsCast } from "@vapour/shared/kodi/video";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormButtonComponent, ThumbnailComponent, TranslatePipe],
  selector: "cast",
  templateUrl: "cast.component.html",
})
export class CastComponent {
  readonly cast = input.required<VideoDetailsCast[]>();
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

  incrementPage() {
    this.page.update((i) => i + 1);
  }
}
