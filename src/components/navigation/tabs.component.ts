import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

export type TabItem = {
  path: string;
  label: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  selector: "tabs",
  templateUrl: "tabs.component.html",
})
export class TabsComponent {
  readonly items = input<TabItem[]>([]);
}
