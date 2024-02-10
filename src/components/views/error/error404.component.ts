import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AlertComponent } from "../../core/alert.component";
import { MainContentComponent } from "../../root/main-content.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent, MainContentComponent],
  standalone: true,
  selector: "error404",
  templateUrl: "error404.component.html",
})
export class Error404Component {}
