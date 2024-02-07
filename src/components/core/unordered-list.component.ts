import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "unordered-list",
  standalone: true,
  templateUrl: "unordered-list.component.html",
})
export class UnorderedListComponent {
  @Input() items: string[] = [];
}
