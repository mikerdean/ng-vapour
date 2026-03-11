import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import {
  TabsComponent,
  type TabItem,
} from "@vapour/components/navigation/tabs.component";
import { MainContentComponent } from "@vapour/components/root/main-content.component";
import { translate } from "@vapour/signals/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainContentComponent, RouterOutlet, TabsComponent],
  selector: "tv",
  templateUrl: "tv.component.html",
})
export class TvComponent {
  readonly translations = translate({
    recent: "tabs.tv.recent",
    titles: "tabs.tv.titles",
  });

  readonly tabItems = computed<TabItem[]>(() => [
    { label: this.translations.recent(), path: "/tv/recent" },
    { label: this.translations.titles(), path: "/tv/titles" },
  ]);
}
