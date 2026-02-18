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
  selector: "addons",
  templateUrl: "addons.component.html",
})
export class AddonsComponent {
  constructor(private translationService: TranslationService) {}

  readonly tabItems$: Observable<TabItem[]> = combineLatest([
    this.translationService.translate("addons:tabs.installed"),
  ]).pipe(map(([recent]) => [{ label: recent, path: "/addons/installed" }]));
}
