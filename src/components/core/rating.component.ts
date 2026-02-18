import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent],
  selector: "rating",
  templateUrl: "rating.component.html",
})
export class RatingComponent {
  readonly value = input.required<number>();

  readonly rating = computed(() => {
    const value = this.value();

    const int32 = Math.trunc(value);
    const precision = value % 1;

    return Array.from({ length: 10 }, (_, i) => {
      if (i < int32) {
        return 1;
      } else if (i === int32 && precision >= 0.5) {
        return 0.5;
      } else {
        return 0;
      }
    });
  });

  readonly icons = {
    halfStar: faStarHalfAlt,
    star: faStar,
    starEmpty: faStarEmpty,
  };
}
