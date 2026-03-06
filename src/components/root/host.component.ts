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
  max,
  min,
  required,
  submit,
} from "@angular/forms/signals";

import { FullscreenMessageComponent } from "@vapour/components/core/fullscreen-message.component";
import { HeadingComponent } from "@vapour/components/core/heading.component";
import { FormButtonComponent } from "@vapour/components/form/form-button.component";
import { FormInputStringComponent } from "@vapour/components/form/form-input-string.component";
import { ConnectionComponent } from "@vapour/components/root/connection.component";
import { translate } from "@vapour/signals/translate";
import { HostState } from "@vapour/state/host.state";

import { FormInputNumberComponent } from "../form/form-input-number";

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
  readonly #hostState = inject(HostState);

  readonly translations = translate({
    title: "host.title",
    hostname: "host.form.hostname",
    tcpPort: "host.form.tcpPort",
    httpPort: "host.form.httpPort",
    save: "common.save",
  });

  readonly hasValidHost = computed(() => Boolean(this.#hostState.host()));

  readonly host = signal({
    hostname: window.location.hostname,
    httpPort: 8080,
    tcpPort: 9090,
  });

  readonly hostForm = form(this.host, (schemaPath) => {
    required(schemaPath.hostname);

    required(schemaPath.httpPort);
    min(schemaPath.httpPort, 1000);
    max(schemaPath.httpPort, 9999);

    required(schemaPath.tcpPort);
    min(schemaPath.tcpPort, 1000);
    max(schemaPath.tcpPort, 9999);
  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    void submit(this.hostForm, () => {
      this.#hostState.update(this.host());
      return Promise.resolve();
    });
  }
}
