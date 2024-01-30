import { Component, Input } from "@angular/core";

import type { AriaRole } from "../../shared/types";

@Component({
  selector: "fullscreen-message",
  standalone: true,
  templateUrl: "fullscreen-message.component.html",
})
export class FullscreenMessageComponent {
  @Input() role: AriaRole | undefined;
}
