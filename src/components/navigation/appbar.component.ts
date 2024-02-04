import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  faEllipsisVertical,
  faRss,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { ProfileService } from "../../services/profile.service";
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
  readonly allowProfileChange$ = this.profileService
    .getProfiles()
    .pipe(map((data) => data.limits.total > 1));

  readonly currentUser$ = this.profileService.getCurrentProfile();

  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faRss,
    search: faSearch,
  };

  constructor(private profileService: ProfileService) {}
}
