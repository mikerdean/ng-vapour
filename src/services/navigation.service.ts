import { Injectable } from "@angular/core";
import { EventType, Router } from "@angular/router";
import { filter, map } from "rxjs";

const navigationEvents = new Set<EventType>([
  EventType.NavigationCancel,
  EventType.NavigationEnd,
  EventType.NavigationError,
  EventType.NavigationSkipped,
  EventType.NavigationStart,
]);

@Injectable({ providedIn: "root" })
export class NavigationService {
  readonly navigating$ = this.router.events.pipe(
    filter((ev) => navigationEvents.has(ev.type)),
    map((ev) => ev.type === EventType.NavigationStart),
  );

  constructor(private router: Router) {}
}
