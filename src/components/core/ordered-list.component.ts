import { NgForOf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf],
  selector: "ordered-list",
  standalone: true,
  templateUrl: "ordered-list.component.html",
})
export class OrderedListComponent {
  @Input() items: string[] = [];

  trackByIndex(index: number): number {
    return index;
  }
}
