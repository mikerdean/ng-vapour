import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AlertComponent } from "@vapour/components/core/alert.component";
import { MainContentComponent } from "@vapour/components/root/main-content.component";
import { translate } from "@vapour/signals/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent, MainContentComponent],
  selector: "error404",
  templateUrl: "error404.component.html",
})
export class Error404Component {
  readonly translations = translate({
    description: "error404.description",
    title: "titles.error404",
  });
}
