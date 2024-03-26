import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";
import type {
  GetAddon,
  GetAddonQuery,
  GetAddons,
  GetAddonsQuery,
  GetAddonsQueryFilters,
} from "@vapour/shared/kodi";

@Injectable({ providedIn: "root" })
export class AddonService {
  constructor(
    private configurationService: ConfigurationService,
    private socketService: SocketService,
  ) {}

  getAddons(
    page = 1,
    filters: GetAddonsQueryFilters = {},
  ): Observable<GetAddons> {
    return this.socketService.send<GetAddonsQuery, GetAddons>(
      "Addons.GetAddons",
      {
        ...filters,
        limits: this.configurationService.getPageLimits(page),
        properties: [
          "author",
          "broken",
          "deprecated",
          "enabled",
          "name",
          "rating",
          "thumbnail",
        ],
      },
    );
  }

  getAddonById(id: string): Observable<GetAddon> {
    return this.socketService.send<GetAddonQuery, GetAddon>(
      "Addons.GetAddons",
      {
        addonid: id,
        properties: [
          "author",
          "broken",
          "deprecated",
          "enabled",
          "name",
          "rating",
          "thumbnail",
        ],
      },
    );
  }
}
