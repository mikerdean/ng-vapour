import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AlertComponent } from "@vapour/components/core/alert.component";
import { translate } from "@vapour/signals/translate";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlertComponent],
  selector: "error404",
  templateUrl: "error404.component.html",
})
export class Error404Component {
  readonly translations = translate({
    description: "error404.description",
    title: "titles.error404",
  });
}
