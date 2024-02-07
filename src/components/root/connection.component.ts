import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { map, Observable } from "rxjs";

import { HostService } from "../../services/host.service";
import { SocketService } from "../../services/socket.service";
import { DefinitionListComponent } from "../core/definition-list.component";
import type { DefinitionListItem } from "../core/definition-list.types";
import { FullscreenMessageComponent } from "../core/fullscreen-message.component";
import { HeadingComponent } from "../core/heading.component";
import { OrderedListComponent } from "../core/ordered-list.component";
import { FormButtonComponent } from "../form/form-button.component";
import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { AppbarComponent } from "../navigation/app-bar.component";
import { NavigationBarComponent } from "../navigation/navigation-bar.component";

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
  readonly connectionState$ = this.socketService.connectionState$;

  readonly errorListItems = [
    "Kodi is running",
    "You have enabled Settings > Services > Control > Allow Remote Control via HTTP",
    "You have enabled Settings > Services > Control > Allow Remote Control from applications on this system",
  ];

  readonly hostSummaryItems: Observable<DefinitionListItem[]> =
    this.hostService.host$.pipe(
      map((host) => [
        { header: "Hostname", description: host?.hostname || "Unknown" },
        { header: "Port", description: host?.tcpPort.toString() || "Unknown" },
      ]),
    );

  readonly icons = {
    loading: faCircleNotch,
  };

  constructor(
    private hostService: HostService,
    private socketService: SocketService,
  ) {}

  clear() {
    this.hostService.clear();
  }

  reconnect() {
    this.hostService.retry();
  }
}
