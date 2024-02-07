import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";

import { ImageOberserverService } from "../services/image-observer.service";

@Directive({
  selector: "[hideUntilIntersected]",
  standalone: true,
})
export class HideUntilIntersectedDirective implements OnDestroy, OnInit {
  constructor(
    private element: ElementRef,
    private imageObserver: ImageOberserverService,
  ) {}

  @Input("hideUntilIntersected") src = "";

  ngOnInit(): void {
    const element = this.element.nativeElement;
    if (!this.isImageElement(element)) {
      return;
    }

    element.removeAttribute("src");
    element.classList.add(
      "transition-opacity",
      "opacity-0",
      "ease-in",
      "duration-300",
    );

    this.imageObserver.add(element, (entry) => {
      const currentSrc = element.getAttribute("src");
      if (currentSrc || !entry.isIntersecting) {
        return;
      }

      element.setAttribute("src", this.src);
      element.classList.replace("opacity-0", "opacity-100");
    });
  }

  ngOnDestroy(): void {
    this.imageObserver.remove(this.element.nativeElement);
  }

  private isImageElement(element: Element): element is HTMLImageElement {
    return element instanceof HTMLImageElement;
  }
}
