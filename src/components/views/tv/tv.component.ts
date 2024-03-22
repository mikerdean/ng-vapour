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
  selector: "tv",
  standalone: true,
  templateUrl: "tv.component.html",
})
export class TvComponent {
  constructor(private translationService: TranslationService) {}

  readonly tabItems$: Observable<TabItem[]> = combineLatest([
    this.translationService.translate("tv:tabs.inprogress"),
    this.translationService.translate("tv:tabs.recent"),
    this.translationService.translate("tv:tabs.titles"),
    this.translationService.translate("tv:tabs.genres"),
  ]).pipe(
    map(([inprogress, recent, titles, genres]) => [
      { label: inprogress, path: "/tv/in-progress" },
      { label: recent, path: "/tv/recent" },
      { label: titles, path: "/tv/titles" },
      { label: genres, path: "/tv/genres" },
    ]),
  );
}
