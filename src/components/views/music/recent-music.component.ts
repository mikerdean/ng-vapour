import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "recent-music",
  standalone: true,
  templateUrl: "recent-music.component.html",
})
export class RecentMusicComponent {}
