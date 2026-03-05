import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
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
import { PlayerService } from "@vapour/services/player.service";
import { translate } from "@vapour/signals/translate";

export type NavigationBarItem = {
  icon: FontAwesomeIcon;
  path: string;
  title: Signal<string>;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    PlayingButtonComponent,
    RouterLink,
    RouterLinkActive,
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

  readonly translations = translate({
    addons: "navbar.addons",
    movies: "navbar.movies",
    music: "navbar.music",
    settings: "navbar.settings",
    tv: "navbar.tv",
  });

  readonly links: NavigationBarItem[] = [
    { path: "/movies", icon: faFilm, title: this.translations.movies },
    { path: "/music", icon: faMusic, title: this.translations.music },
    { path: "/tv", icon: faDisplay, title: this.translations.tv },
    { path: "/addons", icon: faCubes, title: this.translations.addons },
    { path: "/settings", icon: faCog, title: this.translations.settings },
  ];
}
