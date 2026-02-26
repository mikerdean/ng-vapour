import { Injectable } from "@angular/core";

import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private socketService: SocketService) {}

  getCurrentProfile() {
    return this.socketService.send("Profiles.GetCurrentProfile", {
      properties: ["lockmode", "thumbnail"],
    });
  }

  getProfiles() {
    return this.socketService.send("Profiles.GetProfiles", {
      properties: ["lockmode", "thumbnail"],
      sort: { method: "label", order: "ascending" },
    });
  }
}
