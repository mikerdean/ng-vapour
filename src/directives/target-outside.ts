import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";

@Directive({
  selector: "[targetOutside]",
  standalone: true,
})
export class TargetOutsideDirective {
  constructor(private ref: ElementRef<Element>) {}

  @HostListener("document:click", ["$event"])
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
