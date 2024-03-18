import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { routes } from "@vapour/components/app.routes";
import { RouteWithMetadata } from "@vapour/components/app.routes.types";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { NavigationBarItem } from "@vapour/components/navigation/navigation-bar.types";
import { TranslatePipe } from "@vapour/pipes/translate";

const hasIcon = (route: RouteWithMetadata): route is NavigationBarItem => {
  return "icon" in route;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ],
  selector: "navigation-bar",
  standalone: true,
  templateUrl: "navigation-bar.component.html",
})
export class NavigationBarComponent {
  readonly links: NavigationBarItem[] = routes.filter(hasIcon);
}
