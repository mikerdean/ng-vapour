import { inject, Injectable } from "@angular/core";
import { InferOutput } from "valibot";

import { addonQueryFilters } from "@vapour/schema/addons";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { SocketService } from "@vapour/services/socket.service";

@Injectable({ providedIn: "root" })
export class AddonService {
  readonly #configurationService = inject(ConfigurationService);
  readonly #socketService = inject(SocketService);

  getAddons(page = 1, filters: InferOutput<typeof addonQueryFilters> = {}) {
    return this.#socketService.send("Addons.GetAddons", {
      ...filters,
      limits: this.#configurationService.getPageLimits(page),
      properties: [
        "author",
        "broken",
        "deprecated",
        "enabled",
        "name",
        "rating",
        "thumbnail",
      ],
    });
  }

  getAddonById(id: string) {
    return this.#socketService.send("Addons.GetAddonDetails", {
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
    });
  }
}
