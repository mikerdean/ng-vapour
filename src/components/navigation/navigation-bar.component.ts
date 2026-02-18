import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { NavigationBarItem } from "@vapour/components/navigation/navigation-bar.types";
import { PlayingButtonComponent } from "@vapour/components/playing/playing-button.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { PlayerService } from "@vapour/services/player.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    PlayingButtonComponent,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ],
  selector: "navigation-bar",
  templateUrl: "navigation-bar.component.html",
})
export class NavigationBarComponent {
  constructor(private playerService: PlayerService) {}

  readonly links: NavigationBarItem[] = [
    { path: "/movies", icon: faFilm, title: "navigation.navbar.movies" },
    { path: "/music", icon: faMusic, title: "navigation.navbar.music" },
    { path: "/tv", icon: faDisplay, title: "navigation.navbar.tv" },
    { path: "/addons", icon: faCubes, title: "navigation.navbar.addons" },
    { path: "/settings", icon: faCog, title: "navigation.navbar.settings" },
  ];

  readonly isPlaying$ = this.playerService.playing$.pipe(
    map(
      (players) =>
        players.filter(
          (player) => player.state === "playing" || player.state === "paused",
        ).length > 0,
    ),
  );
}
