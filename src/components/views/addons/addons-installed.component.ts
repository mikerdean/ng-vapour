import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { GridComponent } from "@vapour/components/grid/grid.component";
import { prepareGrid } from "@vapour/components/grid/grid.utils";
import { AddonService } from "@vapour/services/addons.service";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { MappingService } from "@vapour/services/mapping.service";
import { TitleService } from "@vapour/services/title.service";
import { emptyParamsValidator, pageValidator } from "@vapour/validators";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, GridComponent],
  selector: "addons-available",
  standalone: true,
  templateUrl: "addons-installed.component.html",
})
export class AddonsInstalledComponent {
  constructor(
    private addonService: AddonService,
    private configurationService: ConfigurationService,
    private mappingService: MappingService,
    private route: ActivatedRoute,
    titleService: TitleService,
  ) {
    titleService.setTranslatedTitle("addons:titles.installed");
  }

  readonly addons$ = prepareGrid(
    emptyParamsValidator,
    pageValidator,
    this.route,
    this.configurationService.pageSize,
    (_, { page }) =>
      this.addonService.getAddons(page, { installed: true }).pipe(
        map(({ addons, limits }) => ({
          currentPage: page,
          items: addons.map((addon) =>
            this.mappingService.mapAddonToGridItem(addon),
          ),
          limits,
        })),
      ),
  );
}
