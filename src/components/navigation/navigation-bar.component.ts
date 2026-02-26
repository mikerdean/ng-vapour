import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import {
  FontawesomeIconComponent,
  type FontAwesomeIcon,
} from "@vapour/components/images/fontawesome-icon.component";
import { PlayingButtonComponent } from "@vapour/components/playing/playing-button.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { PlayerService } from "@vapour/services/player.service";

export type NavigationBarItem = {
  icon: FontAwesomeIcon;
  path: string;
  title: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
  private readonly playerService = inject(PlayerService);

  readonly isPlaying = computed(() => {
    const players = this.playerService.playing();
    return (
      players.filter(({ state }) => state === "playing" || state === "paused")
        .length > 0
    );
  });

  readonly links: NavigationBarItem[] = [
    { path: "/movies", icon: faFilm, title: "navigation.navbar.movies" },
    { path: "/music", icon: faMusic, title: "navigation.navbar.music" },
    { path: "/tv", icon: faDisplay, title: "navigation.navbar.tv" },
    { path: "/addons", icon: faCubes, title: "navigation.navbar.addons" },
    { path: "/settings", icon: faCog, title: "navigation.navbar.settings" },
  ];
}
