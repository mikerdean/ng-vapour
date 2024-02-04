import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type NavigationBarItem = {
  icon: IconDefinition;
  label: string;
  path: string[];
};
