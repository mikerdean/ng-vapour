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
  selector: "music",
  templateUrl: "music.component.html",
})
export class MusicComponent {
  readonly translations = translate({
    genres: "tabs.music.genres",
    recent: "tabs.music.recent",
    albums: "tabs.music.albums",
    artists: "tabs.music.artists",
  });

  readonly tabItems = computed<TabItem[]>(() => [
    { label: this.translations.recent(), path: "/music/recent" },
    { label: this.translations.artists(), path: "/music/artists" },
    { label: this.translations.albums(), path: "/music/albums" },
    { label: this.translations.genres(), path: "/music/genres" },
  ]);
}
