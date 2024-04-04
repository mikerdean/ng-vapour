import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
  host: {
    "(document:click)": "documentClick($event)",
  },
  selector: "[targetOutside]",
  standalone: true,
})
export class TargetOutsideDirective {
  constructor(private ref: ElementRef<Element>) {}

  documentClick(ev: MouseEvent) {
    if (!ev.target) {
      return;
    }

    const element = this.ref.nativeElement;
    if (element.contains(ev.target as Node)) {
      return;
    }

    this.outside.emit();
  }

  @Output() readonly outside = new EventEmitter();
}
