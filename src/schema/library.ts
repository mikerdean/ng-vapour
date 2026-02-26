import { array, object, string, type InferOutput } from "valibot";

import { itemDetailsBase } from "./base";
import { id, int } from "./utils";

export const libraryDetailsGenre = object({
  ...itemDetailsBase.entries,
  genreid: id(),
  sourceid: array(int()),
  thumbnail: string(),
  title: string(),
});

export type LibraryDetailsGenre = InferOutput<typeof libraryDetailsGenre>;
