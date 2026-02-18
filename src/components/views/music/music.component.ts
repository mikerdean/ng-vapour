import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { combineLatest, map, Observable } from "rxjs";

import { TabsComponent } from "@vapour/components/navigation/tabs.component";
import type { TabItem } from "@vapour/components/navigation/tabs.types";
import { MainContentComponent } from "@vapour/components/root/main-content.component";
import { TranslationService } from "@vapour/services/translation.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MainContentComponent, RouterOutlet, TabsComponent],
  selector: "music",
  templateUrl: "music.component.html",
})
export class MusicComponent {
  constructor(private translationService: TranslationService) {}

  readonly tabItems$: Observable<TabItem[]> = combineLatest([
    this.translationService.translate("music:tabs.recent"),
    this.translationService.translate("music:tabs.artists"),
    this.translationService.translate("music:tabs.albums"),
    this.translationService.translate("music:tabs.genres"),
  ]).pipe(
    map(([recent, artists, albums, genres]) => [
      { label: recent, path: "/music/recent" },
      { label: artists, path: "/music/artists" },
      { label: albums, path: "/music/albums" },
      { label: genres, path: "/music/genres" },
    ]),
  );
}
