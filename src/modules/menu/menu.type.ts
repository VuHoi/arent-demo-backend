import { STATUS } from '@/config/constants';
import { BaseQuery } from '@/types/Common';

export type MenuItem = {
  name?: string;
  title?: string;
  order?: number;
  icon?: string;
  level?: number;
  status?: STATUS;
};

export type MenuParams = {
  id: string;
};
export interface MenuQuery extends BaseQuery {
  name?: string;
}
