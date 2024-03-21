import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { NavigationBarItem } from "@vapour/components/navigation/navigation-bar.types";
import { TranslatePipe } from "@vapour/pipes/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ],
  selector: "navigation-bar",
  standalone: true,
  templateUrl: "navigation-bar.component.html",
})
export class NavigationBarComponent {
  readonly links: NavigationBarItem[] = [
    { path: "/movies", icon: faFilm, title: "navigation.navbar.movies" },
    { path: "/music", icon: faMusic, title: "navigation.navbar.music" },
    { path: "/tv", icon: faDisplay, title: "navigation.navbar.tv" },
    { path: "/addons", icon: faCubes, title: "navigation.navbar.addons" },
    { path: "/settings", icon: faCog, title: "navigation.navbar.settings" },
  ];
}
