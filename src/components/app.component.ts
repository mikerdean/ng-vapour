import { ChangeDetectionStrategy, Component } from "@angular/core";

import { HostComponent } from "@vapour/components/root/host.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HostComponent],
  selector: "app-root",
  templateUrl: "app.component.html",
})
export class AppComponent {} // eslint-disable-line @typescript-eslint/no-extraneous-class
