import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import {
  DefinitionListComponent,
  type DefinitionListItem,
} from "@vapour/components/core/definition-list.component";
import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { OrderedListComponent } from "@vapour/components/core/ordered-list.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { AppbarComponent } from "@vapour/components/navigation/app-bar.component";
import { NavigationBarComponent } from "@vapour/components/navigation/navigation-bar.component";
import {
  TabsComponent,
  type TabItem,
} from "@vapour/components/navigation/tabs.component";
import { SocketService } from "@vapour/services/socket.service";
import { locationPath } from "@vapour/signals/location";
import { translate } from "@vapour/signals/translate";
import { HostState } from "@vapour/state/host.state";

const emptyTabs: TabItem[] = [];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppbarComponent,
    DefinitionListComponent,
    FontawesomeIconComponent,
    FormButtonComponent,
    FullscreenMessageComponent,
    HeadingComponent,
    NavigationBarComponent,
    OrderedListComponent,
    RouterOutlet,
    TabsComponent,
  ],
  selector: "connection",
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {
  readonly #hostState = inject(HostState);
  readonly #socketService = inject(SocketService);

  readonly connectionState = this.#socketService.connectionState;

  readonly path = locationPath();

  readonly translations = translate({
    changeHost: "connection.buttons.changeHost",
    connecting: "connection.connecting",
    errorList1: "connection.errorList.1",
    errorList2: "connection.errorList.2",
    errorList3: "connection.errorList.3",
    errorListIntroduction: "connection.errorList.introduction",
    hostname: "connection.hostSummary.hostName",
    label: "connection.hostSummary.label",
    port: "connection.hostSummary.port",
    reconnect: "connection.buttons.retry",
    subtitle: "connection.subtitle",
    summaryIntroduction: "connection.hostSummary.introduction",
    title: "connection.title",
    unknown: "common.unknown",

    tabsMoviesRecent: "tabs.movies.recent",
    tabsMoviesTitles: "tabs.movies.titles",
    tabsMoviesSets: "tabs.movies.sets",
    tabsMoviesGenres: "tabs.movies.genres",
    tabsMusicRecent: "tabs.music.recent",
    tabsMusicArtists: "tabs.music.artists",
    tabsMusicAlbums: "tabs.music.albums",
    tabsMusicGenres: "tabs.music.genres",
    tabsTvRecent: "tabs.tv.recent",
    tabsTvTitles: "tabs.tv.titles",
  });

  readonly tabs = computed<TabItem[]>(() => {
    const segments = this.path().split("/");
    if (segments.length < 2) {
      return emptyTabs;
    }

    switch (segments[1]) {
      case "addons":
        return [];
      case "movies":
        return [
          {
            label: this.translations.tabsMoviesRecent(),
            path: "/movies/recent",
          },
          {
            label: this.translations.tabsMoviesTitles(),
            path: "/movies/titles",
          },
          { label: this.translations.tabsMoviesSets(), path: "/movies/sets" },
          {
            label: this.translations.tabsMoviesGenres(),
            path: "/movies/genres",
          },
        ];
      case "music":
        return [
          { label: this.translations.tabsMusicRecent(), path: "/music/recent" },
          {
            label: this.translations.tabsMusicArtists(),
            path: "/music/artists",
          },
          { label: this.translations.tabsMusicAlbums(), path: "/music/albums" },
          { label: this.translations.tabsMusicGenres(), path: "/music/genres" },
        ];
      case "tv":
        return [
          { label: this.translations.tabsTvRecent(), path: "/tv/recent" },
          { label: this.translations.tabsTvTitles(), path: "/tv/titles" },
        ];
      default:
        return emptyTabs;
    }
  });

  readonly errorListItems = computed<string[]>(() => [
    this.translations.errorList1(),
    this.translations.errorList2(),
    this.translations.errorList3(),
  ]);

  readonly hostSummaryItems = computed<DefinitionListItem[]>(() => [
    {
      header: this.translations.hostname(),
      description:
        this.#hostState.host()?.hostname || this.translations.unknown(),
    },
    {
      header: this.translations.port(),
      description:
        this.#hostState.host()?.tcpPort.toString() ||
        this.translations.unknown(),
    },
  ]);

  readonly icons = {
    loading: faCircleNotch,
  };

  clear() {
    this.#hostState.clear();
  }

  reconnect() {
    this.#socketService.retry();
  }
}
