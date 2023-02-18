export interface BaseQuery {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 1 | -1;
}

export type PaginationResult<T> = { total_count: number; items: T[] };

export type BaseServiceOutput<T> = {
  result?: any;
  code?: number;
  data?: T;
};

export enum ORDER {
  DESC = -1,
  ASC = 1,
}

export type AuthType = {
  username?: string;
  email?: string;
  id?: string;
};
