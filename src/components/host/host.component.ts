import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, Observable } from "rxjs";

import { HostService } from "./host.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIf],
  providers: [HostService],
  selector: "host",
  standalone: true,
  templateUrl: "host.component.html",
})
export class HostComponent {
  hasValidHost$: Observable<boolean> = this.hostService.host$.pipe(
    map((host) => (host ? true : false)),
  );

  constructor(private hostService: HostService) {}
}
