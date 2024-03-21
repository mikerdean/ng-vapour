import { Injectable } from "@angular/core";
import { ActivationEnd, EventType, Router } from "@angular/router";
import { filter, map, switchMap } from "rxjs";

import { TranslationService } from "@vapour/services/translation.service";

const navigationEvents = new Set<EventType>([
  EventType.NavigationCancel,
  EventType.NavigationEnd,
  EventType.NavigationError,
  EventType.NavigationSkipped,
  EventType.NavigationStart,
]);

@Injectable({ providedIn: "root" })
export class NavigationService {
  constructor(
    private router: Router,
    private translationService: TranslationService,
  ) {}

  readonly currentRouteTitle$ = this.router.events.pipe(
    filter((ev): ev is ActivationEnd => ev.type === EventType.ActivationEnd),
    filter((ev) => ev.snapshot.children.length === 0),
    map((ev) => ev.snapshot.title),
    filter((key): key is string => key !== undefined),
    switchMap((key) => this.translationService.translate(key)),
  );

  readonly navigating$ = this.router.events.pipe(
    filter((ev) => navigationEvents.has(ev.type)),
    map((ev) => ev.type === EventType.NavigationStart),
  );
}
