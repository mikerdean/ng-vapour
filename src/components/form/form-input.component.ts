import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";
import { nanoid } from "nanoid";
import { combineLatest, map, Observable, switchMap } from "rxjs";

import { FormInputType } from "@vapour/components/form/form-input.types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ReactiveFormsModule],
  selector: "form-input",
  templateUrl: "form-input.component.html",
})
export class FormInputComponent {
  constructor() {
    this.errors$ = combineLatest([
      toObservable(this.form),
      toObservable(this.name),
    ]).pipe(
      switchMap(([form, name]) =>
        form.controls[name].statusChanges.pipe(
          map((status) => ({ status, form, name })),
        ),
      ),
      map(({ status, form, name }) =>
        status === "INVALID" ? form.controls[name]?.errors || null : null,
      ),
    );

    this.errorClasses$ = combineLatest([
      toObservable(this.form),
      toObservable(this.name),
    ]).pipe(
      switchMap(([form, name]) => form.controls[name].statusChanges),
      map((status) =>
        status === "INVALID" ? ["bg-fuchsia-200!", "border-fuchsia-500!"] : [],
      ),
    );
  }

  readonly errors$: Observable<ValidationErrors | null>;
  readonly errorClasses$: Observable<string[]>;
  readonly form = input.required<FormGroup>();
  readonly id = nanoid();
  readonly label = input<string>();
  readonly max = input<number>();
  readonly min = input<number>();
  readonly name = input.required<string>();
  readonly type = input<FormInputType>("text");
}
