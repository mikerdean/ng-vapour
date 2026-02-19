import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "kodi-logo",
  standalone: true,
  templateUrl: "kodi-logo.component.svg",
})
export class KodiLogoComponent {} // eslint-disable-line @typescript-eslint/no-extraneous-class
