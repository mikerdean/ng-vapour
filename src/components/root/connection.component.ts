import { AsyncPipe, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

import { HostService } from "../../services/host.service";
import { SocketService } from "../../services/socket.service";
import { FullscreenMessageComponent } from "../core/fullscreen-message.component";
import { HeadingComponent } from "../core/heading.component";
import { OrderedListComponent } from "../core/ordered-list.component";
import { FormButtonComponent } from "../form/form-button.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FormButtonComponent,
    FullscreenMessageComponent,
    HeadingComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    OrderedListComponent,
  ],
  selector: "connection",
  standalone: true,
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {
  connectionState$ = this.socketService.connectionState$;

  errorListItems = [
    "Kodi is running",
    "You have enabled Settings > Services > Control > Allow Remote Control via HTTP",
    "You have enabled Settings > Services > Control > Allow Remote Control from applications on this system",
  ];

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
