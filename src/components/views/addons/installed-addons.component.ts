import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "installed-addons",
  standalone: true,
  templateUrl: "installed-addons.component.html",
})
export class InstalledAddonsComponent {}
