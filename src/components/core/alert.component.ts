import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTimes,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import {
  FontawesomeIconComponent,
  type FontAwesomeIcon,
} from "@vapour/components/images/fontawesome-icon.component";

export type AlertType = "success" | "info" | "warning" | "error";

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

  readonly dismiss = output();

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
