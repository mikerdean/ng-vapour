import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { HeadingLevel } from "@vapour/components/core/heading.types";

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
