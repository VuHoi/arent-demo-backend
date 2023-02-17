export interface BaseQuery {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'DESC' | 'ASC';
}

export type PaginationResult<T> = { total_count: number; items: T[] };

export enum ORDER {
  DESC = 'DESC',
  ASC = 'ASC',
}
