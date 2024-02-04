import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EventType, Router } from "@angular/router";
import {
  faEllipsisVertical,
  faMobileRetro,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { filter, map } from "rxjs";

import { ProfileService } from "../../services/profile.service";
import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { KodiLogoComponent } from "../images/kodi-logo.component";

const navigationEvents = new Set<EventType>([
  EventType.NavigationCancel,
  EventType.NavigationEnd,
  EventType.NavigationError,
  EventType.NavigationSkipped,
  EventType.NavigationStart,
]);

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

  readonly loading$ = this.router.events.pipe(
    filter((ev) => navigationEvents.has(ev.type)),
    map((ev) => ev.type === EventType.NavigationStart),
  );

  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faMobileRetro,
    search: faSearch,
  };

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {}
}
