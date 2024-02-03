import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { AppbarComponent } from "./navigation/appbar.component";
import { ConnectionComponent } from "./root/connection.component";
import { HostComponent } from "./root/host.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppbarComponent, ConnectionComponent, HostComponent, RouterOutlet],
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
})
export class AppComponent {}
