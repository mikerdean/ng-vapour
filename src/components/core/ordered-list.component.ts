import { NgForOf } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
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
