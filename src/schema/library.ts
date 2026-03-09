import { array, object, optional, string, type InferOutput } from "valibot";

import { itemDetailsBase } from "./base";
import { id, int } from "./utils";

export const libraryDetailsGenre = object({
  ...itemDetailsBase.entries,
  genreid: id(),
  sourceid: optional(array(int())),
  thumbnail: optional(string()),
  title: optional(string()),
});

export type LibraryDetailsGenre = InferOutput<typeof libraryDetailsGenre>;
