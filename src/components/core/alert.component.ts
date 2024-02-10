import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faTimes,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent],
  selector: "alert",
  standalone: true,
  templateUrl: "alert.component.html",
})
export class AlertComponent {
  @Input() dismissable = false;
  @Input() title?: string;
  @Input({ required: true }) type: "success" | "info" | "warning" | "error" =
    "info";

  @Output() dismiss = new EventEmitter();

  dismissed = false;
  readonly dismissableIcon = faTimes;

  get cssClasses(): string[] {
    switch (this.type) {
      case "success":
        return ["bg-green-900", "border-green-700"];
      case "info":
        return ["bg-cyan-900", "border-cyan-700"];
      case "warning":
        return ["bg-yellow-700", "border-yellow-500"];
      case "error":
        return ["bg-fuchsia-900", "border-fuchsia-700"];
    }
  }

  get icon(): IconDefinition {
    switch (this.type) {
      case "success":
        return faCircleCheck;
      case "info":
        return faCircleInfo;
      case "warning":
        return faWarning;
      case "error":
        return faCircleExclamation;
    }
  }

  onDismissed() {
    this.dismissed = true;
    this.dismiss.emit();
  }
}
