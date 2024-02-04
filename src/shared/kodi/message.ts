export type KodiMessageBase = {
  jsonrpc: "2.0";
};

export type KodiMessageEvent = (message: KodiMessageBase) => void;

export type KodiRequest<T> = KodiMessageBase & {
  id: string;
  method: string;
  params: T;
};

export type KodiNotification<T> = KodiMessageBase & {
  method: string;
  params: T;
};

export type KodiResponse<T> = KodiMessageBase & {
  id: string;
  result: T;
};

export type KodiResponseError = KodiMessageBase & {
  id: string;
  error: KodiError;
};

export type KodiError = {
  code: number;
  data: unknown;
  message: string;
};

export type KodiMessageLimits = {
  end?: number;
  start?: number;
};

export type KodiMessageLimitsReturned = KodiMessageLimits & {
  total: number;
};

export type KodiMessageSort = {
  ignorearticle?: boolean;
  method?: string;
  order?: "ascending" | "descending";
  useartistsortname?: boolean;
};

export type KodiMessageFilterOfType = {
  field: string;
  operator: string;
  value: string | string[];
};

export type KodiMessageFilterAnd = {
  and: KodiMessageFilterOfType[];
};

export type KodiMessageFilterOr = {
  or: KodiMessageFilterOfType[];
};

export type KodiMessageFilter =
  | KodiMessageFilterOfType
  | KodiMessageFilterAnd
  | KodiMessageFilterOr;
