export type ItemDetailsBase = {
  label: string;
};

export type MediaArtwork = {
  banner?: string;
  fanart?: string;
  poster?: string;
  thumb?: string;
};

export type MediaDetailsBase = ItemDetailsBase & {
  fanart?: string;
  thumbnail?: string;
};

export type Properties<T> = {
  properties: (keyof T)[];
};
