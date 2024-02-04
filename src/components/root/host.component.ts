import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { map, Observable } from "rxjs";

import { HostService } from "../../services/host.service";
import { FullscreenMessageComponent } from "../core/fullscreen-message.component";
import { HeadingComponent } from "../core/heading.component";
import { FormButtonComponent } from "../form/form-button.component";
import { FormInputComponent } from "../form/form-input.component";
import { ConnectionComponent } from "./connection.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ConnectionComponent,
    FormButtonComponent,
    FormInputComponent,
    FullscreenMessageComponent,
    HeadingComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  selector: "host",
  standalone: true,
  templateUrl: "host.component.html",
})
export class HostComponent {
  readonly portMin = 1000;
  readonly portMax = 9999;

  readonly hasValidHost$: Observable<boolean> = this.hostService.host$.pipe(
    map((host) => (host ? true : false)),
  );

  readonly hostForm = new FormGroup({
    hostname: new FormControl<string>(window.location.hostname, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    httpPort: new FormControl<number>(8080, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(this.portMin),
        Validators.max(this.portMax),
      ],
    }),
    tcpPort: new FormControl<number>(9090, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(this.portMin),
        Validators.max(this.portMax),
      ],
    }),
  });

  constructor(private hostService: HostService) {}

  onSubmit() {
    if (!this.hostForm.valid) {
      return;
    }

    this.hostService.update(this.hostForm.getRawValue());
  }
}
