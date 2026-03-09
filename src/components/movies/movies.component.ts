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
  selector: "movies",
  templateUrl: "movies.component.html",
})
export class MoviesComponent {
  readonly translations = translate({
    genres: "tabs.movies.genres",
    recent: "tabs.movies.recent",
    sets: "tabs.movies.sets",
    titles: "tabs.movies.titles",
  });

  readonly tabItems = computed<TabItem[]>(() => [
    { label: this.translations.recent(), path: "/movies/recent" },
    { label: this.translations.titles(), path: "/movies/titles" },
    { label: this.translations.sets(), path: "/movies/sets" },
    { label: this.translations.genres(), path: "/movies/genres" },
  ]);
}
