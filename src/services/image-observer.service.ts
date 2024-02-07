import { Injectable, OnDestroy } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImageOberserverService implements OnDestroy {
  #observer: IntersectionObserver;
  #actions: WeakMap<Element, (element: IntersectionObserverEntry) => void>;

  constructor() {
    this.#actions = new WeakMap();
    this.#observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const action = this.#actions.get(entry.target);
        if (action) {
          action(entry);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.#observer.disconnect();
  }

  add(element: Element, action: (entry: IntersectionObserverEntry) => void) {
    this.#actions.set(element, action);
    this.#observer.observe(element);
  }

  remove(element: Element) {
    this.#actions.delete(element);
    this.#observer.unobserve(element);
  }
}
