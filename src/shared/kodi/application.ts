import type { Properties } from "./base";

export type ApplicationProperties = {
  language?: string;
  muted?: boolean;
  name?: string;
  sorttokens?: string[];
  version?: ApplicationPropertiesVersion;
  volume?: number;
};

export type ApplicationPropertiesVersion = {
  major: number;
  minor: number;
  revision: string;
  tag: string;
};

export type ApplicationPropertiesQuery = Properties<ApplicationProperties>;
