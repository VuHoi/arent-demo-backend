import { Service } from 'typedi';
import Logger from '@/core/logger';
import { BaseQuery, PaginationResult } from '@/types/Common';
import { MenuModel } from './menu.model';

import { MenuItem } from './menu.type';

@Service()
export default class MenuService {
  private logger = new Logger('MenuService');

  /**
   * Query Menu
   */
  async query(filter: Pick<MenuItem, 'name'>, query: BaseQuery): Promise<PaginationResult<MenuItem>> {
    try {
      const user = await MenuModel.find({});
      // console.log(user);
      this.logger.debug('[query:success]', { filter, query });
      return { total_count: 0, items: [] };
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
