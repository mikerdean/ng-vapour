import { NgForOf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { routes } from "../app.routes";
import type { RouteWithMetadata } from "../app.routes.types";
import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import type { NavigationBarItem } from "./navigation-bar.types";

const hasIcon = (route: RouteWithMetadata): route is NavigationBarItem => {
  return "icon" in route;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent, NgForOf, RouterLink, RouterLinkActive],
  selector: "navigation-bar",
  standalone: true,
  templateUrl: "navigation-bar.component.html",
})
export class NavigationBarComponent {
  readonly links: NavigationBarItem[] = routes.filter(hasIcon);
}
