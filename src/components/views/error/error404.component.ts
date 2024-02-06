import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: "error404",
  templateUrl: "error404.component.html",
})
export class Error404Component {}
