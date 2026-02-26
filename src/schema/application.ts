import { array, boolean, object, optional, string } from "valibot";

import { int, properties } from "./utils";

const applicationPropertiesVersion = object({
  major: int(),
  minor: int(),
  revision: string(),
  tag: string(),
});

const applicationProperties = object({
  language: optional(string()),
  muted: optional(boolean()),
  name: string(),
  sorttokens: optional(array(string())),
  version: optional(applicationPropertiesVersion),
  volume: optional(int()),
});

export const getPropertiesRequest = object({
  properties: properties(applicationProperties, [
    "volume",
    "muted",
    "name",
    "version",
    "sorttokens",
    "language",
  ]),
});

export const getPropertiesResponse = applicationProperties;
