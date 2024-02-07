import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "ordered-list",
  standalone: true,
  templateUrl: "ordered-list.component.html",
})
export class OrderedListComponent {
  @Input() items: string[] = [];
}
