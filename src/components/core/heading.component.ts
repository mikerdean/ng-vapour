import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { HeadingLevel } from "@vapour/components/core/heading.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  selector: "heading",
  templateUrl: "heading.component.html",
})
export class HeadingComponent {
  readonly id = input<string>();
  readonly level = input<HeadingLevel>(1);
}
