import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { nanoid } from "nanoid";
import { map, Observable } from "rxjs";

import type { FormInputErrors, FormInputType } from "./form-input.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ReactiveFormsModule],
  standalone: true,
  selector: "form-input",
  templateUrl: "form-input.component.html",
})
export class FormInputComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;
  @Input() label?: string;
  @Input() max?: number;
  @Input() min?: number;
  @Input({ required: true }) name!: string;
  @Input() type: FormInputType = "text";

  readonly id: string = nanoid();

  errors$!: Observable<FormInputErrors | null>;

  ngOnInit(): void {
    this.errors$ = this.form.controls[this.name].statusChanges.pipe(
      map((status) => {
        const control = this.form.controls[this.name];
        const errors = control.errors;

        if (status !== "INVALID" || errors === null) {
          return null;
        }

        return {
          max: errors["max"] ? true : false,
          min: errors["min"] ? true : false,
          required: errors["required"] === true,
        };
      }),
    );
  }
}
