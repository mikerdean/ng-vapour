import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  faEllipsisVertical,
  faRss,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { of } from "rxjs";

import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { KodiLogoComponent } from "../images/kodi-logo.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent, KodiLogoComponent, NgIf],
  selector: "appbar",
  standalone: true,
  templateUrl: "appbar.component.html",
})
export class AppbarComponent {
  readonly allowProfileChange$ = of(true);
  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faRss,
    search: faSearch,
  };
}
