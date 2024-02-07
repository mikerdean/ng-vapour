import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { HeadingLevel } from "./heading.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  selector: "heading",
  standalone: true,
  templateUrl: "heading.component.html",
})
export class HeadingComponent {
  @Input() id?: string;
  @Input() level: HeadingLevel = 1;
}
