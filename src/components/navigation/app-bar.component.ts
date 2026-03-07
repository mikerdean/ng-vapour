import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  faEllipsisVertical,
  faMobileRetro,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { KodiLogoComponent } from "@vapour/components/images/kodi-logo.component";
import { ProfileService } from "@vapour/services/profile.service";
import { translate } from "@vapour/signals/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent, KodiLogoComponent],
  selector: "app-bar",
  templateUrl: "app-bar.component.html",
})
export class AppbarComponent {
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  readonly allowProfileChange = computed(
    () => (this.profiles.value()?.total ?? 0) > 1,
  );

  readonly currentUser = resource({
    loader: () => this.profileService.getCurrentProfile(),
  });

  readonly icons = {
    config: faEllipsisVertical,
    profile: faUserCircle,
    remote: faMobileRetro,
    search: faSearch,
  };

  readonly navigating = computed(() =>
    Boolean(this.router.currentNavigation()),
  );

  readonly profiles = resource({
    loader: async () => {
      const { limits } = await this.profileService.getProfiles();
      return limits;
    },
  });

  readonly translations = translate({
    config: "appbar.buttons.config",
    profile: "appbar.buttons.profile",
    remote: "common.remote",
    search: "common.search",
    title: "titles.main",
  });
}
