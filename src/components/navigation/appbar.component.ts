import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  faEllipsisVertical,
  faRss,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs";

import { SocketService } from "../../services/socket.service";
import { ProfileDetailsPaged, ProfilesQuery } from "../../shared/kodi";
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
  allowProfileChange$ = this.socketService
    .send<ProfilesQuery, ProfileDetailsPaged>("Profiles.GetProfiles", {
      properties: ["lockmode", "thumbnail"],
      sort: { method: "label", order: "ascending" },
    })
    .pipe(map((data) => data.limits.total > 1));

  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faRss,
    search: faSearch,
  };

  constructor(private socketService: SocketService) {}
}
