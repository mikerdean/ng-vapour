import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "connection",
  standalone: true,
  templateUrl: "connection.component.html",
})
export class ConnectionComponent {}
