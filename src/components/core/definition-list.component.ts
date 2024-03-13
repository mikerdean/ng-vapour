import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { DefinitionListItem } from "@vapour/components/core/definition-list.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "definition-list",
  standalone: true,
  templateUrl: "definition-list.component.html",
})
export class DefinitionListComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) items!: DefinitionListItem[];
}
