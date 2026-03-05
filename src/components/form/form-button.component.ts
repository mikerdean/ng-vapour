import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import clsx, { type ClassValue } from "clsx";

const defaultCssClasses = [
  "rounded-sm",
  "bg-fuchsia-600",
  "px-3",
  "py-2",
  "text-slate-50",
  "focus:outline-hidden",
  "focus:ring-4",
  "focus:ring-fuchsia-900",
  "focus:ring-offset-2",
  "focus:ring-offset-slate-800",
  "cursor-pointer",
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-button",
  standalone: true,
  templateUrl: "form-button.component.html",
})
export class FormButtonComponent {
  readonly css = input<ClassValue>();
  readonly disabled = input(false);
  readonly type = input<"button" | "submit" | "reset">("button");

  readonly classNames = computed(() =>
    clsx(
      ...defaultCssClasses,
      {
        "disabled:opacity-50": this.disabled(),
        "cursor-pointer": !this.disabled(),
        "cursor-not-allowed": this.disabled(),
        "hover:bg-fuchsia-700": !this.disabled(),
      },
      this.css(),
    ),
  );
}
