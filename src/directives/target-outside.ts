import { Directive, ElementRef, inject, output } from "@angular/core";

@Directive({
  host: {
    "(document:click)": "documentClick($event)",
  },
  selector: "[targetOutside]",
  standalone: true,
})
export class TargetOutsideDirective {
  readonly #ref = inject<ElementRef<Element>>(ElementRef);

  documentClick(ev: MouseEvent) {
    if (!ev.target) {
      return;
    }

    const element = this.#ref.nativeElement;
    if (element.contains(ev.target as Node)) {
      return;
    }

    this.outside.emit();
  }

  readonly outside = output();
}
