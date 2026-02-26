import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

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
