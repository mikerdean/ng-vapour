import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "unordered-list",
  standalone: true,
  templateUrl: "unordered-list.component.html",
})
export class UnorderedListComponent {
  readonly items = input<string[]>([]);
}
