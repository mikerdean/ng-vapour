import { ChangeDetectionStrategy, Component, input } from "@angular/core";

export type DefinitionListItem = {
  header: string;
  description: string;
};

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
