import { Service } from 'typedi';
import Logger from '@/core/logger';
import { AuthType, BaseQuery, BaseServiceOutput, PaginationResult } from '@/types/Common';
import { MenuModel } from './menu.model';

import { MenuItem } from './menu.type';
import { toOutput } from '@/utils/common';
import { MenuError } from './menu.error';
import { Types } from 'mongoose';

@Service()
export default class MenuService {
  private logger = new Logger('MenuService');

  get publicOutputKeys() {
    return ['id', 'title', 'name', 'level', 'icon'];
  }

  get privateOutputKeys() {
    return ['id', 'title', 'name', 'level', 'order', 'icon', 'created_by', 'updated_by'];
  }
  /**
   * Query Menu by admin
   */
  async queryByAdmin(filter: Pick<MenuItem, 'name' | 'status'>, query: BaseQuery): Promise<PaginationResult<MenuItem>> {
    try {
      const { page, per_page, sort_by, sort_order } = query;
      const $match = filter;
      const pipeline = [
        {
          $match,
        },
        ...(sort_by && [
          {
            $sort: { [sort_by]: sort_order },
          },
        ]),
        {
          $facet: {
            paging: [
              {
                $count: 'total_count',
              },
            ],
            items: [{ $skip: (+page - 1) * +per_page }, { $limit: +per_page }],
          },
        },
      ] as any;
      const [{ paging: [{ total_count = 0 } = {}] = [{ total_count: 0 }], items }] = await MenuModel.aggregate(
        pipeline,
      );
      this.logger.debug('[query:success]', { filter, query });
      return { total_count, items };
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }

  /**
   * Create a new Menu item
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async createNewMenuItem(payload: MenuItem, auth: AuthType): Promise<BaseServiceOutput<MenuItem>> {
    try {
      const { name } = payload;
      const menuItem = await MenuModel.findOne({ name });
      if (menuItem) {
        throw new MenuError('MENU_ITEM_ALREADY_EXIST');
      }

      const menuPayload = new MenuModel({
        ...payload,
        ...(auth && { created_by: new Types.ObjectId(auth.id) }),
      });

      const value = await menuPayload.save();
      this.logger.debug('create:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.privateOutputKeys);
    } catch (err) {
      this.logger.error('create:error', err.message);
      throw err;
    }
  }

  /**
   * Update a  Menu item
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async updateMenuItem(id: string, payload: MenuItem, auth: AuthType): Promise<BaseServiceOutput<MenuItem>> {
    try {
      const { name } = payload;
      const menuItem = await MenuModel.findById(id);
      if (!menuItem) {
        throw new MenuError('MENU_ITEM_NOT_FOUND');
      }

      const menuItemExist = await MenuModel.findOne({ _id: { $ne: id }, name });
      if (menuItemExist) {
        throw new MenuError('MENU_ITEM_ALREADY_EXIST');
      }
      const menuItemPayload = await MenuModel.findByIdAndUpdate(
        id,
        {
          ...payload,
          ...(auth && { updated_by: new Types.ObjectId(auth.id) }),
        },
        { new: true },
      );
      const value = await menuItemPayload.save();
      this.logger.debug('update:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.privateOutputKeys);
    } catch (err) {
      this.logger.error('update:error', err.message);
      throw err;
    }
  }

  /**
   * Query Menu
   */
  async query(): Promise<BaseServiceOutput<Array<MenuItem>>> {
    try {
      const result = await MenuModel.find({});
      this.logger.debug('[query menu:success]');
      return toOutput(result, this.publicOutputKeys);
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
