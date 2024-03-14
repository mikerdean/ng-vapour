import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-button",
  standalone: true,
  templateUrl: "form-button.component.html",
})
export class FormButtonComponent {
  readonly disabled = input(false);
  readonly type = input<"button" | "submit" | "reset">("button");
}
