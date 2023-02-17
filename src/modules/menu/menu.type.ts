import { BaseQuery } from '@/types/Common';

export type MenuItem = {
  name?: string;
  title?: string;
};

export type ContentParams = {
  id: string;
};
export interface MenuQuery extends BaseQuery {
  name?: string;
}
export type CheckContentParams = {
  name: string;
};
