import { NgForOf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
  faCog,
  faCubes,
  faDisplay,
  faFilm,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "../images/fontawesome-icon.component";
import { NavigationBarItem } from "./navigation-bar.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent, NgForOf, RouterLink, RouterLinkActive],
  selector: "navigation-bar",
  standalone: true,
  templateUrl: "navigation-bar.component.html",
})
export class NavigationBarComponent {
  readonly links: NavigationBarItem[] = [
    { label: "Movies", icon: faFilm, path: ["movies"] },
    { label: "TV", icon: faDisplay, path: ["tv"] },
    { label: "Music", icon: faMusic, path: ["music"] },
    { label: "Addons", icon: faCubes, path: ["addons"] },
    { label: "Settings", icon: faCog, path: ["settings"] },
  ];
}
