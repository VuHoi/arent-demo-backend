import { BaseQuery, BaseServiceOutput } from '@/types/Common';
import { isNil, pick } from 'lodash';

/**
 * Get runtime config from "process" Nodejs
 */
export const getRuntimeEnv = (key: string, defaultValue?: any): string => {
  if (typeof process.env[key] === 'undefined') {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key];
};

/**
 * Throw an error
 */
export const throwErr = (err: Error | any): void => {
  throw err;
};

/**
 * Get filter and query from Express request query
 */
export const buildQueryFilter = <T>(reqQuery: BaseQuery & T) => {
  const { page, per_page, sort_by, sort_order, ...filter } = reqQuery;
  return {
    filter,
    query: { page, per_page, sort_by, sort_order },
  };
};

export const toOutput = (result: any, fields: Array<string>): BaseServiceOutput<any> => {
  if (!isNil(result.length)) {
    return {
      data: result.map((item: any) => {
        const { _id: id, ...rest } = item;
        return pick({ ...(rest._doc ? rest._doc : rest), id }, fields);
      }),
    };
  } else {
    const { _id: id, ...rest } = result;
    return { data: pick({ ...rest, id }, fields) };
  }
};
