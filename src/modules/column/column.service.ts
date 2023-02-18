import { Service } from 'typedi';
import Logger from '@/core/logger';
import { AuthType, BaseQuery, BaseServiceOutput, PaginationResult } from '@/types/Common';
import { ColumnModel } from './column.model';

import { Column } from './column.type';
import { toOutput } from '@/utils/common';
import { ColumnError } from './column.error';
import { Types } from 'mongoose';

@Service()
export default class ColumnService {
  private logger = new Logger('ColumnService');

  get publicOutputKeys() {
    return ['id', 'title', 'image', 'tags'];
  }

  get privateOutputKeys() {
    return ['id', 'title', 'image', 'tags', 'created_by', 'is_recommened', 'updated_by'];
  }
  /**
   * Query Column by admin
   */
  async queryByAdmin(filter: Pick<Column, 'tags' | 'status'>, query: BaseQuery): Promise<PaginationResult<Column>> {
    try {
      const { page, per_page, sort_by, sort_order } = query;
      const $match = { ...filter, ...(filter.tags && { tags: { $in: filter.tags } }) };
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
      const [{ paging: [{ total_count = 0 } = {}] = [{ total_count: 0 }], items }] = await ColumnModel.aggregate(
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
   * Create a new column
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async createNewColumn(payload: Column, auth: AuthType): Promise<BaseServiceOutput<Column>> {
    try {
      const { title } = payload;
      const columnItem = await ColumnModel.findOne({ title });
      if (columnItem) {
        throw new ColumnError('COLUMN_ALREADY_EXIST');
      }

      const columnPayload = new ColumnModel({
        ...payload,
        ...(auth && { created_by: new Types.ObjectId(auth.id) }),
      });

      const value = await columnPayload.save();
      this.logger.debug('create:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.privateOutputKeys);
    } catch (err) {
      this.logger.error('create:error', err.message);
      throw err;
    }
  }

  /**
   * Update a column
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async updateColumn(id: string, payload: Column, auth: AuthType): Promise<BaseServiceOutput<Column>> {
    try {
      const { title } = payload;
      const column = await ColumnModel.findById(id);
      if (!column) {
        throw new ColumnError('COLUMN_NOT_FOUND');
      }

      const columnExist = await ColumnModel.findOne({ _id: { $ne: id }, title });
      if (columnExist) {
        throw new ColumnError('COLUMN_ALREADY_EXIST');
      }
      const columnPayload = await ColumnModel.findByIdAndUpdate(
        id,
        {
          ...payload,
          ...(auth && { updated_by: new Types.ObjectId(auth.id) }),
        },
        { new: true },
      );
      const value = await columnPayload.save();
      this.logger.debug('update:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.privateOutputKeys);
    } catch (err) {
      this.logger.error('update:error', err.message);
      throw err;
    }
  }

  /**
   * Query Column
   */
  async query(): Promise<BaseServiceOutput<Array<Column>>> {
    try {
      const result = await ColumnModel.find({});
      this.logger.debug('[query Column:success]');
      return toOutput(result, this.publicOutputKeys);
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
