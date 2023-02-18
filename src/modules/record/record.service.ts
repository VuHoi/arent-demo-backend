import { Service } from 'typedi';
import Logger from '@/core/logger';
import { AuthType, BaseServiceOutput } from '@/types/Common';
import { RecordModel } from './record.model';

import { Record, RecordQuery } from './record.type';
import dayjs from 'dayjs';
import { toOutput } from '@/utils/common';
import { Types } from 'mongoose';

@Service()
export default class RecordService {
  private logger = new Logger('recordService');

  get publicOutputKeys() {
    return ['id', 'weight', 'createdAt'];
  }

  /**
   * Query record
   */
  async query(query: RecordQuery, auth: AuthType): Promise<BaseServiceOutput<Array<Record>>> {
    try {
      try {
        const $match = {
          createdAt: {
            $gte: dayjs(query.start_date).startOf('date').toDate(),
            $lte: dayjs(query.end_date).endOf('date').toDate(),
          },
          created_by: new Types.ObjectId(auth.id),
        };
        const pipeline = [
          {
            $match,
          },
        ];
        const items = await RecordModel.aggregate(pipeline);
        this.logger.debug('[query_record:success]');
        return toOutput(items, this.publicOutputKeys);
      } catch (err) {
        this.logger.error('[query:error]', err.message);
        throw err;
      }
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
