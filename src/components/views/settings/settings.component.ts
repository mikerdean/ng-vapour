import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "settings",
  standalone: true,
  templateUrl: "settings.component.html",
})
export class SettingsComponent {}
