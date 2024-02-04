import type { Route } from "@angular/router";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type RouteWithMetadata = Route & {
  icon?: IconDefinition;
};
