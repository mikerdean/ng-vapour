import { ChangeDetectionStrategy, Component, input } from "@angular/core";

import { DefinitionListItem } from "@vapour/components/core/definition-list.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "definition-list",
  standalone: true,
  templateUrl: "definition-list.component.html",
})
export class DefinitionListComponent {
  readonly label = input.required<string>();
  readonly items = input.required<DefinitionListItem[]>();
}
