import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { TabsComponent } from "@vapour/components/navigation/tabs.component";
import type { TabItem } from "@vapour/components/navigation/tabs.types";
import { MainContentComponent } from "@vapour/components/root/main-content.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainContentComponent, RouterOutlet, TabsComponent],
  selector: "movies",
  standalone: true,
  templateUrl: "movies.component.html",
})
export class MoviesComponent {
  constructor() {}

  readonly tabItems: TabItem[] = [
    { label: "Recent", path: "/movies/recent" },
    { label: "Titles", path: "/movies/titles" },
    { label: "Sets", path: "/movies/sets" },
    { label: "Genres", path: "/movies/genres" },
  ];
}
