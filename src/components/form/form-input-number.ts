import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
  model,
} from "@angular/core";
import {
  type FormValueControl,
  type ValidationError,
  type WithOptionalFieldTree,
} from "@angular/forms/signals";
import { nanoid } from "nanoid";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-input-number",
  templateUrl: "form-input-number.component.html",
})
export class FormInputNumberComponent implements FormValueControl<number> {
  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>(
    [],
  );

  readonly displayValue = linkedSignal(() => this.value().toString());
  readonly id = nanoid();
  readonly label = input<string>();
  readonly invalid = input<boolean>(false);
  readonly max = input<number | undefined>();
  readonly min = input<number | undefined>();
  readonly name = input.required<string>();
  readonly required = input<boolean>(false);
  readonly value = model.required<number>();

  updateModel(newValue: string): void {
    const parsed = Number.parseInt(newValue, 10);
    this.value.set(parsed);
  }
}
