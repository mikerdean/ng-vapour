export type GridItem = {
  id: string | number;
  details: GridItemDetail[];
  label: string;
  played?: boolean;
  thumbnail?: string;
  url: string;
};

export type GridItemDetail = string | number | boolean | undefined | null;
