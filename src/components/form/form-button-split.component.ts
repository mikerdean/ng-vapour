import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";

export type FormButtonSplitItem = {
  icon?: IconDefinition;
  label: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent, FormButtonComponent, NgClass],
  selector: "form-button-split",
  standalone: true,
  templateUrl: "form-button-split.component.html",
})
export class FormButtonSplitComponent {
  readonly disabled = input(false);
  readonly items = input<FormButtonSplitItem[]>([]);
  readonly selected = signal<FormButtonSplitItem | undefined>(undefined);

  readonly current = computed(() => {
    const selected = this.selected();
    const items = this.items();

    return selected || items[0];
  });

  readonly icons = {
    dropdown: faCaretDown,
  };
}
