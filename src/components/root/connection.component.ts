import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { map, Observable } from "rxjs";

import { DefinitionListComponent } from "@vapour/components/core/definition-list.component";
import { DefinitionListItem } from "@vapour/components/core/definition-list.types";
import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { OrderedListComponent } from "@vapour/components/core/ordered-list.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { AppbarComponent } from "@vapour/components/navigation/app-bar.component";
import { NavigationBarComponent } from "@vapour/components/navigation/navigation-bar.component";
import { HostService } from "@vapour/services/host.service";
import { SocketService } from "@vapour/services/socket.service";

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
  ],
  selector: "connection",
  standalone: true,
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {
  constructor(
    private hostService: HostService,
    private socketService: SocketService,
  ) {}

  readonly connectionState$ = this.socketService.connectionState$;

  readonly errorListItems = [
    "Kodi is running",
    "You have enabled Settings > Services > Control > Allow Remote Control via HTTP",
    "You have enabled Settings > Services > Control > Allow Remote Control from applications on this system",
  ];

  readonly hostSummaryItems$: Observable<DefinitionListItem[]> =
    this.hostService.host$.pipe(
      map((host) => [
        { header: "Hostname", description: host?.hostname || "Unknown" },
        { header: "Port", description: host?.tcpPort.toString() || "Unknown" },
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
