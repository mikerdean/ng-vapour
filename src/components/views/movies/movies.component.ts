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
  selector: "movies",
  templateUrl: "movies.component.html",
})
export class MoviesComponent {
  constructor(private translationService: TranslationService) {}

  readonly tabItems$: Observable<TabItem[]> = combineLatest([
    this.translationService.translate("movies:tabs.recent"),
    this.translationService.translate("movies:tabs.titles"),
    this.translationService.translate("movies:tabs.sets"),
    this.translationService.translate("movies:tabs.genres"),
  ]).pipe(
    map(([recent, titles, sets, genres]) => [
      { label: recent, path: "/movies/recent" },
      { label: titles, path: "/movies/titles" },
      { label: sets, path: "/movies/sets" },
      { label: genres, path: "/movies/genres" },
    ]),
  );
}
