import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { AriaRole } from "@vapour/shared/types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "fullscreen-message",
  standalone: true,
  templateUrl: "fullscreen-message.component.html",
})
export class FullscreenMessageComponent {
  readonly role = input<AriaRole>();
}
