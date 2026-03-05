import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import {
  form,
  FormField,
  submit,
  validateStandardSchema,
} from "@angular/forms/signals";
import {
  integer,
  maxValue,
  minValue,
  number,
  object,
  pipe,
  string,
  type InferOutput,
} from "valibot";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FormInputStringComponent } from "@vapour/components/form/form-input-string.component";
import { ConnectionComponent } from "@vapour/components/root/connection.component";
import { HostService } from "@vapour/services/host.service";
import { translate } from "@vapour/signals/translate";

import { FormInputNumberComponent } from "../form/form-input-number";

const hostSchema = object({
  hostname: string(),
  httpPort: pipe(number(), integer(), minValue(1000), maxValue(9999)),
  tcpPort: pipe(number(), integer(), minValue(1000), maxValue(9999)),
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ConnectionComponent,
    FormButtonComponent,
    FormField,
    FormInputStringComponent,
    FormInputNumberComponent,
    FullscreenMessageComponent,
    HeadingComponent,
  ],
  selector: "host",
  templateUrl: "host.component.html",
})
export class HostComponent {
  readonly #hostService = inject(HostService);

  readonly translations = translate({
    title: "host.title",
    hostname: "host.form.hostname",
    tcpPort: "host.form.tcpPort",
    httpPort: "host.form.httpPort",
    save: "common.save",
  });

  readonly hasValidHost = computed(() => Boolean(this.#hostService.host()));

  readonly host = signal<InferOutput<typeof hostSchema>>({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  readonly hostForm = form(this.host, (schemaPath) => {
    validateStandardSchema(schemaPath, hostSchema);
  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    void submit(this.hostForm, () => {
      this.#hostService.update(this.host());
      return Promise.resolve();
    });
  }
}
