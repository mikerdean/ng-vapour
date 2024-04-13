import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { combineLatest, delay, map } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { AriaRole } from "@vapour/shared/types";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:keydown.escape)": "closeModal()",
  },
  imports: [AsyncPipe, FontawesomeIconComponent],
  selector: "fullscreen-message",
  standalone: true,
  templateUrl: "fullscreen-message.component.html",
})
export class FullscreenMessageComponent implements OnInit, OnDestroy {
  readonly allowClose = input(true);
  readonly background = input(false);
  readonly closing = signal(false);
  readonly role = input<AriaRole>();

  @Output() readonly close = new EventEmitter();

  readonly background$ = combineLatest([
    toObservable(this.background),
    toObservable(this.closing),
  ]).pipe(
    delay(0),
    map(([background, closing]) => background && !closing),
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
