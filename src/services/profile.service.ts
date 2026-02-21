import { Injectable } from "@angular/core";

import {
  getCurrentProfileRequest,
  getCurrentProfileResponse,
  getProfilesRequest,
  getProfilesResponse,
} from "@vapour/schema/profiles";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private socketService: SocketService) {}

  getCurrentProfile() {
    return this.socketService.send(
      "Profiles.GetCurrentProfile",
      getCurrentProfileRequest,
      getCurrentProfileResponse,
      {
        properties: ["lockmode", "thumbnail"],
      },
    );
  }

  getProfiles() {
    return this.socketService.send(
      "Profiles.GetProfiles",
      getProfilesRequest,
      getProfilesResponse,
      {
        properties: ["lockmode", "thumbnail"],
        sort: { method: "label", order: "ascending" },
      },
    );
  }
}
