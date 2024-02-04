import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import type {
  ProfileDetails,
  ProfileDetailsPaged,
  ProfileDetailsQuery,
  ProfilesQuery,
} from "../shared/kodi";
import { SocketService } from "./socket.service";

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
