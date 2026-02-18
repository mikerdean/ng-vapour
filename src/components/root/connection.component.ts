import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { combineLatest, map, Observable, tap } from "rxjs";

import { DefinitionListComponent } from "@vapour/components/core/definition-list.component";
import { DefinitionListItem } from "@vapour/components/core/definition-list.types";
import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { OrderedListComponent } from "@vapour/components/core/ordered-list.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { AppbarComponent } from "@vapour/components/navigation/app-bar.component";
import { NavigationBarComponent } from "@vapour/components/navigation/navigation-bar.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { HostService } from "@vapour/services/host.service";
import { SocketService } from "@vapour/services/socket.service";
import { TitleService } from "@vapour/services/title.service";
import { TranslationService } from "@vapour/services/translation.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppbarComponent,
    AsyncPipe,
    DefinitionListComponent,
    FontawesomeIconComponent,
    FormButtonComponent,
    FullscreenMessageComponent,
    HeadingComponent,
    NavigationBarComponent,
    OrderedListComponent,
    RouterOutlet,
    TranslatePipe,
  ],
  selector: "connection",
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {
  constructor(
    private hostService: HostService,
    private socketService: SocketService,
    private translationService: TranslationService,
    private titleService: TitleService,
  ) {}

  readonly connectionState$ = this.socketService.connectionState$.pipe(
    tap((state) => {
      if (state === "disconnected") {
        this.titleService.setTranslatedTitle("root.connection.title");
      }
    }),
  );

  readonly errorListItems$ = combineLatest([
    this.translationService.translate("root.connection.errorList.1"),
    this.translationService.translate("root.connection.errorList.2"),
    this.translationService.translate("root.connection.errorList.3"),
  ]);

  readonly hostSummaryItems$: Observable<DefinitionListItem[]> = combineLatest([
    this.hostService.host$,
    this.translationService.translateMany([
      { key: "root.connection.hostSummary.hostName" },
      { key: "root.connection.hostSummary.port" },
      { key: "common:unknown" },
    ]),
  ]).pipe(
    map(([host, [hostname, port, unknown]]) => [
      { header: hostname, description: host?.hostname || unknown },
      { header: port, description: host?.tcpPort.toString() || unknown },
    ]),
  );

  readonly icons = {
    loading: faCircleNotch,
  };

  clear() {
    this.hostService.clear();
  }

  reconnect() {
    this.hostService.retry();
  }
}
