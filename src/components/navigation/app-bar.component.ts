import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  faEllipsisVertical,
  faMobileRetro,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { KodiLogoComponent } from "@vapour/components/images/kodi-logo.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { NavigationService } from "@vapour/services/navigation.service";
import { ProfileService } from "@vapour/services/profile.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FontawesomeIconComponent,
    KodiLogoComponent,
    TranslatePipe,
  ],
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
