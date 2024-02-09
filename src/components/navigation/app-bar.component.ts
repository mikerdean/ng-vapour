import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  faEllipsisVertical,
  faMobileRetro,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { NavigationService } from "../../services/navigation.service";
import { ProfileService } from "../../services/profile.service";
import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { KodiLogoComponent } from "../images/kodi-logo.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FontawesomeIconComponent, KodiLogoComponent],
  selector: "app-bar",
  standalone: true,
  templateUrl: "app-bar.component.html",
})
export class AppbarComponent {
  constructor(
    private navigationService: NavigationService,
    private profileService: ProfileService,
  ) {}

  readonly profiles$ = this.profileService.getProfiles();

  readonly allowProfileChange$ = this.profiles$.pipe(
    map((data) => data.limits.total > 1),
  );

  readonly currentUser$ = this.profileService.getCurrentProfile();

  readonly navigating$ = this.navigationService.navigating$;

  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faMobileRetro,
    search: faSearch,
  };
}
