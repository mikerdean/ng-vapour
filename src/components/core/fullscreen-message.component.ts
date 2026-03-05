import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { AriaRole } from "@vapour/shared/types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keydown.escape)": "closeModal()",
  },
  imports: [FontawesomeIconComponent],
  selector: "fullscreen-message",
  templateUrl: "fullscreen-message.component.html",
})
export class FullscreenMessageComponent implements OnInit, OnDestroy {
  readonly allowClose = input(false);
  readonly background = input(false);
  readonly closing = signal(false);
  readonly role = input<AriaRole>();

  readonly close = output();

  readonly backgroundShow = computed(
    () => this.background() && !this.closing(),
  );

  readonly icons = {
    close: faTimesCircle,
  };

  ngOnInit(): void {
    document.body.classList.add("overflow-hidden");
  }

  ngOnDestroy(): void {
    document.body.classList.remove("overflow-hidden");
  }

  closeModal() {
    if (!this.allowClose()) {
      return;
    }

    this.closing.set(true);
    setTimeout(() => {
      this.close.emit();
    }, 150);
  }
}
