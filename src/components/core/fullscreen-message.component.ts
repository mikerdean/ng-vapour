import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { AriaRole } from "../../shared/types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "fullscreen-message",
  standalone: true,
  templateUrl: "fullscreen-message.component.html",
})
export class FullscreenMessageComponent {
  @Input() role: AriaRole | undefined;
}
