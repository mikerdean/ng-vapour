import type { GridItemDetail } from "@vapour/components/grid/grid.component";

export function getDetails(...details: GridItemDetail[]): GridItemDetail[] {
  return details.filter((x) => Boolean(x));
}
