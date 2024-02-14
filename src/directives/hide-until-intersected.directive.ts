import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  type SimpleChanges,
} from "@angular/core";

import { ImageOberserverService } from "../services/image-observer.service";

@Directive({
  selector: "[hideUntilIntersected]",
  standalone: true,
})
export class HideUntilIntersectedDirective implements OnChanges, OnDestroy {
  constructor(
    private element: ElementRef,
    private imageObserver: ImageOberserverService,
  ) {}

  @Input("hideUntilIntersected") src = "";

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.element.nativeElement;
    if (!this.isImageElement(element)) {
      return;
    }

    const src = changes["src"];
    if (src) {
      if (src.isFirstChange()) {
        element.removeAttribute("src");
        element.classList.add(
          "transition-opacity",
          "opacity-0",
          "ease-in",
          "duration-300",
        );
      } else {
        element.classList.replace("opacity-100", "opacity-0");
      }

      this.imageObserver.remove(this.element.nativeElement);

      this.imageObserver.add(element, (entry) => {
        const currentSrc = element.getAttribute("src");
        if (currentSrc === src.currentValue || !entry.isIntersecting) {
          return;
        }

        element.setAttribute("src", src.currentValue);
        element.classList.replace("opacity-0", "opacity-100");
      });
    }
  }

  ngOnDestroy(): void {
    this.imageObserver.remove(this.element.nativeElement);
  }

  private isImageElement(element: Element): element is HTMLImageElement {
    return element instanceof HTMLImageElement;
  }
}
