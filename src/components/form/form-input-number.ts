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
  type WithOptionalField,
} from "@angular/forms/signals";
import { nanoid } from "nanoid";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-input-number",
  templateUrl: "form-input-number.component.html",
})
export class FormInputNumberComponent implements FormValueControl<number> {
  readonly displayValue = linkedSignal(() => this.value().toString());
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly id = nanoid();
  readonly label = input<string>();
  readonly invalid = input<boolean>(false);
  readonly max = input<number | undefined>();
  readonly min = input<number | undefined>();
  readonly name = input.required<string>();
  readonly required = input<boolean>(false);
  readonly value = model(0);

  updateModel() {
    this.value.set(Number.parseInt(this.displayValue(), 10));
  }
}
