import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  signal,
} from "@angular/core";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTimes,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import type { AlertType } from "@vapour/components/core/alert.types";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import type { FontAwesomeIcon } from "@vapour/components/images/fontawesome.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent],
  selector: "alert",
  templateUrl: "alert.component.html",
})
export class AlertComponent {
  readonly dismissed = signal(false);
  readonly dismissable = input(false);
  readonly title = input<string>();
  readonly type = input<AlertType>("info");

  @Output() dismiss = new EventEmitter();

  readonly icons = {
    dismiss: faTimes,
    header: computed<FontAwesomeIcon>(() => {
      switch (this.type()) {
        case "success":
          return faCircleCheck;
        case "info":
          return faCircleInfo;
        case "warning":
          return faWarning;
        case "error":
          return faCircleExclamation;
      }
    }),
  };

  classNames = computed(() => {
    switch (this.type()) {
      case "success":
        return "bg-green-900 border-green-700";
      case "info":
        return "bg-cyan-900 border-cyan-700";
      case "warning":
        return "bg-yellow-700 border-yellow-500";
      case "error":
        return "bg-fuchsia-900 border-fuchsia-700";
    }
  });

  onDismissed() {
    this.dismissed.set(true);
    this.dismiss.emit();
  }
}
