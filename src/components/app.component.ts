import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { ConnectionComponent } from "./connection/connection.component";
import { HostComponent } from "./host/host.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConnectionComponent, HostComponent, RouterOutlet],
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
})
export class AppComponent {}
