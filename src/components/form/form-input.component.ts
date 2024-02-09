import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import {
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { nanoid } from "nanoid";
import { map, Observable } from "rxjs";

import type { FormInputType } from "./form-input.types";

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

  errorClasses$!: Observable<string[]>;
  errors$!: Observable<ValidationErrors | null>;

  ngOnInit(): void {
    this.errors$ = this.form.controls[this.name].statusChanges.pipe(
      map((status) =>
        status === "INVALID"
          ? this.form.controls[this.name]?.errors || null
          : null,
      ),
    );

    this.errorClasses$ = this.form.controls[this.name].statusChanges.pipe(
      map((status) =>
        status === "INVALID" ? ["!bg-fuchsia-200", "!border-fuchsia-500"] : [],
      ),
    );
  }
}
