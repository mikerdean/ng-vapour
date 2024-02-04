import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "recent-tv",
  standalone: true,
  templateUrl: "recent-tv.component.html",
})
export class RecentTvComponent {}
