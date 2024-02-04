import type { ItemDetailsBase, Properties } from "./base";
import type {
  KodiMessageLimits,
  KodiMessageLimitsReturned,
  KodiMessageSort,
} from "./message";

export type ProfileDetails = ItemDetailsBase & {
  lockmode?: number;
  thumbnail?: string;
};

export type ProfileDetailsPaged = {
  limits: KodiMessageLimitsReturned;
  profiles: ProfileDetails[];
};

export type ProfileDetailsQuery = Properties<ProfileDetails>;

export type ProfilesQuery = Properties<ProfileDetails> & {
  limits?: KodiMessageLimits;
  sort?: KodiMessageSort;
};
