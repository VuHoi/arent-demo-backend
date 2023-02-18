import { Service } from 'typedi';
import Logger from '@/core/logger';
import { AuthType, BaseServiceOutput } from '@/types/Common';
import { ExerciseModel } from './exercise.model';

import { ExerciseQuery, Exercise } from './exercise.type';
import { toOutput } from '@/utils/common';
import { ExerciseError } from './exercise.error';
import { Types } from 'mongoose';
import dayjs from 'dayjs';

@Service()
export default class ExerciseService {
  private logger = new Logger('ExerciseService');

  get publicOutputKeys() {
    return ['id', 'title', 'description', 'createdAt'];
  }

  /**
   * Create a new Exercise
   * @param payload
   * @param auth
   * @returns {Promise<BaseServiceOutput>}
   */
  async createNewExercise(payload: Exercise, auth: AuthType): Promise<BaseServiceOutput<Exercise>> {
    try {
      const { title } = payload;
      const ExerciseItem = await ExerciseModel.findOne({ title });
      if (ExerciseItem) {
        throw new ExerciseError('EXERCISE_ALREADY_EXIST');
      }

      const ExercisePayload = new ExerciseModel({
        ...payload,
        ...(auth && { created_by: new Types.ObjectId(auth.id) }),
      });

      const value = await ExercisePayload.save();
      this.logger.debug('create:success', JSON.stringify(payload));
      return toOutput(value.toJSON(), this.publicOutputKeys);
    } catch (err) {
      this.logger.error('create:error', err.message);
      throw err;
    }
  }

  /**
   * Query Exercise
   */
  async query(filter: ExerciseQuery, auth: AuthType): Promise<BaseServiceOutput<Array<Exercise>>> {
    try {
      const $match = {
        createdAt: {
          $gte: dayjs(filter.start_date).startOf('date').toDate(),
          $lte: dayjs(filter.end_date).endOf('date').toDate(),
        },
        created_by: new Types.ObjectId(auth.id),
      };
      const result = await ExerciseModel.aggregate([{ $match }]);
      this.logger.debug('[query:success]');
      return toOutput(result, this.publicOutputKeys);
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }
}
