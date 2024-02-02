import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "form-button",
  standalone: true,
  templateUrl: "form-button.component.html",
})
export class FormButtonComponent {
  @Input() disabled = false;
  @Input() type: "button" | "submit" | "reset" = "button";

  @Output() click = new EventEmitter<never>();

  clicked() {
    this.click.emit();
  }
}
