import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {
  GetCurrentProfileRequest,
  GetCurrentProfileResponse,
  GetProfilesRequest,
  GetProfilesResponse,
} from "@vapour/schema/profiles";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private socketService: SocketService) {}

  getCurrentProfile(): Observable<GetCurrentProfileResponse> {
    return this.socketService.send<
      GetCurrentProfileRequest,
      GetCurrentProfileResponse
    >("Profiles.GetCurrentProfile", {
      properties: ["lockmode", "thumbnail"],
    });
  }

  getProfiles(): Observable<GetProfilesResponse> {
    return this.socketService.send<GetProfilesRequest, GetProfilesResponse>(
      "Profiles.GetProfiles",
      {
        properties: ["lockmode", "thumbnail"],
        sort: { method: "label", order: "ascending" },
      },
    );
  }
}
