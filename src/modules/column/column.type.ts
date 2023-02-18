import { STATUS } from '@/config/constants';
import { BaseQuery } from '@/types/Common';

export type Column = {
  title?: string;
  image?: string;
  tags?: Array<string>;
  createdAt?: Date;
  status?: STATUS;
  is_recommened?: boolean;
  type?: ColumnType;
};

export type ColumnParams = {
  id: string;
};
export interface ColumnQuery extends BaseQuery {
  title?: string;
  tags?: string;
  is_recommened?: boolean;
  type?: ColumnType;
}

export enum ColumnType {
  DIET = 'diet',
  BEAUTY = 'beauty',
  HEALTH = 'healthy',
}
