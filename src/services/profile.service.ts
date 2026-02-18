import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SocketService } from "@vapour/services/socket.service";
import type {
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
  ProfilesQuery,
} from "@vapour/shared/kodi/profiles";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private socketService: SocketService) {}

  getCurrentProfile(): Observable<ProfileDetails> {
    return this.socketService.send<ProfileDetailsQuery, ProfileDetails>(
      "Profiles.GetCurrentProfile",
      {
        properties: ["lockmode", "thumbnail"],
      },
    );
  }

  getProfiles(): Observable<ProfileDetailsPaged> {
    return this.socketService.send<ProfilesQuery, ProfileDetailsPaged>(
      "Profiles.GetProfiles",
      {
        properties: ["lockmode", "thumbnail"],
        sort: { method: "label", order: "ascending" },
      },
    );
  }
}
