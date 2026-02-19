/* eslint-disable @typescript-eslint/unbound-method */

import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { combineLatest, map } from "rxjs";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FormInputComponent } from "@vapour/components/form/form-input.component";
import { ConnectionComponent } from "@vapour/components/root/connection.component";
import { HostService } from "@vapour/services/host.service";
import { TranslationService } from "@vapour/services/translation.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ConnectionComponent,
    FormButtonComponent,
    FormInputComponent,
    FullscreenMessageComponent,
    HeadingComponent,
    ReactiveFormsModule,
  ],
  selector: "host",
  templateUrl: "host.component.html",
})
export class HostComponent {
  constructor(
    private hostService: HostService,
    private translationService: TranslationService,
  ) {}

  readonly portMin = 1000;
  readonly portMax = 9999;

  readonly translations$ = combineLatest([
    this.translationService.translate("root.host.title"),
    this.translationService.translate("root.host.form.hostname"),
    this.translationService.translate("root.host.form.tcpPort"),
    this.translationService.translate("root.host.form.httpPort"),
    this.translationService.translate("common:save"),
  ]).pipe(
    map(([title, hostname, tcpPort, httpPort, save]) => ({
      hostname,
      tcpPort,
      httpPort,
      title,
      save,
    })),
  );

  readonly hasValidHost = computed(() => Boolean(this.hostService.host()));

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

  onSubmit() {
    if (!this.hostForm.valid) {
      return;
    }

    this.hostService.update(this.hostForm.getRawValue());
  }
}
