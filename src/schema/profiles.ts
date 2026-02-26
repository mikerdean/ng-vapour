import {
  array,
  integer,
  number,
  object,
  optional,
  pipe,
  string,
} from "valibot";

import {
  itemDetailsBase,
  kodiLimits,
  kodiLimitsWithTotal,
  kodiSort,
} from "./base";
import { properties } from "./utils";

export const profileDetails = object({
  ...itemDetailsBase.entries,
  lockmode: optional(pipe(number(), integer())),
  thumbnail: optional(string()),
});

export const getCurrentProfileRequest = object({
  properties: properties(profileDetails, ["lockmode", "thumbnail"]),
});

export const getCurrentProfileResponse = profileDetails;

export const getProfilesRequest = object({
  ...getCurrentProfileRequest.entries,
  limits: optional(kodiLimits),
  sort: optional(kodiSort),
});

export const getProfilesResponse = object({
  limits: kodiLimitsWithTotal,
  profiles: array(profileDetails),
});
