import { Service } from 'typedi';
import Logger from '@/core/logger';
import { AuthType, BaseServiceOutput } from '@/types/Common';
import { DiaryModel } from './diary.model';

import { DiaryQuery, Diary } from './diary.type';
import { toOutput } from '@/utils/common';
import { DiaryError } from './diary.error';
import { Types } from 'mongoose';
import dayjs from 'dayjs';

@Service()
export default class DiaryService {
  private logger = new Logger('DiaryService');

  get publicOutputKeys() {
    return ['id', 'title', 'description'];
  }

  /**
   * Create a new Diary
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async createNewDiary(payload: Diary, auth: AuthType): Promise<BaseServiceOutput<Diary>> {
    try {
      const { title } = payload;
      const DiaryItem = await DiaryModel.findOne({ title });
      if (DiaryItem) {
        throw new DiaryError('DIARY_ALREADY_EXIST');
      }

      const DiaryPayload = new DiaryModel({
        ...payload,
        ...(auth && { created_by: new Types.ObjectId(auth.id) }),
      });

      const value = await DiaryPayload.save();
      this.logger.debug('create:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.publicOutputKeys);
    } catch (err) {
      this.logger.error('create:error', err.message);
      throw err;
    }
  }

  /**
   * Query Diary
   */
  async query(filter: DiaryQuery, auth: AuthType): Promise<BaseServiceOutput<Array<Diary>>> {
    try {
      const $match = {
        createdAt: {
          $gte: dayjs(filter.start_date).startOf('date').toDate(),
          $lte: dayjs(filter.end_date).endOf('date').toDate(),
        },
        created_by: new Types.ObjectId(auth.id),
      };
      const result = await DiaryModel.aggregate([{ $match }]);
      this.logger.debug('[query:success]');
      return toOutput(result, this.publicOutputKeys);
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
