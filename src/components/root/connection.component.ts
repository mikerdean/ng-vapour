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
import { HostService } from "@vapour/services/host.service";
import { SocketService } from "@vapour/services/socket.service";
import { translate } from "@vapour/signals/translate";

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
  ],
  selector: "connection",
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {
  readonly #hostService = inject(HostService);
  readonly #socketService = inject(SocketService);

  readonly connectionState = this.#socketService.connectionState;

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
        this.#hostService.host()?.hostname || this.translations.unknown(),
    },
    {
      header: this.translations.port(),
      description:
        this.#hostService.host()?.tcpPort.toString() ||
        this.translations.unknown(),
    },
  ]);

  readonly icons = {
    loading: faCircleNotch,
  };

  clear() {
    this.#hostService.clear();
  }

  reconnect() {
    this.#socketService.retry();
  }
}
