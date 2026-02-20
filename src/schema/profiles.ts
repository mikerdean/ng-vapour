import {
  array,
  InferInput,
  integer,
  keyof,
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
import { distinct } from "./utils";

export const profileDetails = object({
  ...itemDetailsBase.entries,
  lockmode: optional(pipe(number(), integer())),
  thumbnail: optional(string()),
});

export const getCurrentProfileRequest = object({
  properties: pipe(array(keyof(profileDetails)), distinct()),
});

export type GetCurrentProfileRequest = InferInput<
  typeof getCurrentProfileRequest
>;

export const getCurrentProfileResponse = profileDetails;

export type GetCurrentProfileResponse = InferInput<
  typeof getCurrentProfileResponse
>;

export const getProfilesRequest = object({
  ...getCurrentProfileRequest.entries,
  limits: optional(kodiLimits),
  sort: optional(kodiSort),
});

export type GetProfilesRequest = InferInput<typeof getProfilesRequest>;

export const getProfilesResponse = object({
  limits: kodiLimitsWithTotal,
  profiles: array(profileDetails),
});

export type GetProfilesResponse = InferInput<typeof getProfilesResponse>;
