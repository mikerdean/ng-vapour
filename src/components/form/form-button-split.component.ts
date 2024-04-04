import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from "@angular/core";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import type { FontAwesomeIcon } from "@vapour/components/images/fontawesome.types";
import { TargetOutsideDirective } from "@vapour/directives/target-outside";

export type FormButtonSplitItem = {
  action: () => void;
  icon: FontAwesomeIcon;
  label: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FontawesomeIconComponent,
    FormButtonComponent,
    TargetOutsideDirective,
  ],
  selector: "form-button-split",
  standalone: true,
  templateUrl: "form-button-split.component.html",
})
export class FormButtonSplitComponent {
  readonly disabled = input(false);
  readonly items = input<FormButtonSplitItem[]>([]);
  readonly show = signal(false);

  readonly current = computed(() => {
    const [item] = this.items();
    return item;
  });

  readonly icons = {
    dropdown: faCaretDown,
  };

  hideDropdown() {
    this.show.set(false);
  }

  performItemAction(item: FormButtonSplitItem) {
    item.action();
    this.hideDropdown();
  }

  toggleDropdown() {
    this.show.update((show) => !show);
  }
}
