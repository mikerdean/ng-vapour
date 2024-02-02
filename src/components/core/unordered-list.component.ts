import { NgForOf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
  selector: "unordered-list",
  standalone: true,
  templateUrl: "unordered-list.component.html",
})
export class UnorderedListComponent {
  @Input() items: string[] = [];

  trackByIndex(index: number): number {
    return index;
  }
}
