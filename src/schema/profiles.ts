import {
  array,
  InferOutput,
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

export type GetCurrentProfileRequest = InferOutput<
  typeof getCurrentProfileRequest
>;

export const getCurrentProfileResponse = profileDetails;

export type GetCurrentProfileResponse = InferOutput<
  typeof getCurrentProfileResponse
>;

export const getProfilesRequest = object({
  ...getCurrentProfileRequest.entries,
  limits: optional(kodiLimits),
  sort: optional(kodiSort),
});

export type GetProfilesRequest = InferOutput<typeof getProfilesRequest>;

export const getProfilesResponse = object({
  limits: kodiLimitsWithTotal,
  profiles: array(profileDetails),
});

export type GetProfilesResponse = InferOutput<typeof getProfilesResponse>;
