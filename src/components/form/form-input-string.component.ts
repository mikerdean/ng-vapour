import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from "@angular/core";
import {
  type FormValueControl,
  type ValidationError,
  type WithOptionalField,
} from "@angular/forms/signals";
import { nanoid } from "nanoid";

export type FormStringType = "email" | "password" | "text" | "url";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-input-string",
  templateUrl: "form-input-string.component.html",
})
export class FormInputStringComponent implements FormValueControl<string> {
  readonly errors = input<readonly WithOptionalField<ValidationError>[]>([]);
  readonly id = nanoid();
  readonly label = input<string>();
  readonly invalid = input<boolean>(false);
  readonly maxLength = input<number | undefined>();
  readonly name = input.required<string>();
  readonly required = input<boolean>(false);
  readonly type = input<FormStringType>("text");
  readonly value = model("");
}
