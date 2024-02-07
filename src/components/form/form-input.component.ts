import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { nanoid } from "nanoid";

import type { FormInputType } from "./form-input.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: "form-input",
  templateUrl: "form-input.component.html",
})
export class FormInputComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() label?: string;
  @Input() max?: number;
  @Input() min?: number;
  @Input({ required: true }) name!: string;
  @Input() type: FormInputType = "text";

  readonly id: string = nanoid();

  get hasError(): boolean {
    return this.form.controls[this.name].invalid;
  }

  get errorMax(): boolean {
    const control = this.form.controls[this.name];
    return control.invalid && control.errors !== null && control.errors["max"];
  }

  get errorMin(): boolean {
    const control = this.form.controls[this.name];
    return control.invalid && control.errors !== null && control.errors["min"];
  }

  get errorRequired(): boolean {
    const control = this.form.controls[this.name];
    return (
      control.invalid &&
      control.errors !== null &&
      control.errors["required"] === true
    );
  }
}
