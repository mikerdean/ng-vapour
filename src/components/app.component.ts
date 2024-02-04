import { ChangeDetectionStrategy, Component } from "@angular/core";

import { HostComponent } from "./root/host.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HostComponent],
  selector: "app-root",
  standalone: true,
  templateUrl: "app.component.html",
})
export class AppComponent {}
