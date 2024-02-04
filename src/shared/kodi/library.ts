import type { ItemDetailsBase } from "./base";

export type LibraryDetailsGenre = ItemDetailsBase & {
  genreid: number;
  sourceid: number[];
  thumbnail: string;
  title: string;
};
