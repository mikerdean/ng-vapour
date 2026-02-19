import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "main-content",
  standalone: true,
  templateUrl: "main-content.component.html",
})
export class MainContentComponent {} // eslint-disable-line @typescript-eslint/no-extraneous-class
