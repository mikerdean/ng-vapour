import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "ordered-list",
  standalone: true,
  templateUrl: "ordered-list.component.html",
})
export class OrderedListComponent {
  readonly items = input<string[]>([]);
}
