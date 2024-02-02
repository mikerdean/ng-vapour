import { NgSwitch, NgSwitchCase, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet],
  selector: "heading",
  standalone: true,
  templateUrl: "heading.component.html",
})
export class HeadingComponent {
  @Input() id?: string;
  @Input() level = 1;
}
