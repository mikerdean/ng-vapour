import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

import type { TabItem } from "./tabs.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  selector: "tabs",
  standalone: true,
  templateUrl: "tabs.component.html",
})
export class TabsComponent {
  @Input() items: TabItem[] = [];
}
