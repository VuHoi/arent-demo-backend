import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  EXERCISE_NOT_FOUND: {
    message: 'Exercise not found',
    code: '4001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
  },
  EXERCISE_ALREADY_EXIST: {
    message: 'Exercise already exist',
    code: '4002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
  },
});

export class ExerciseError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
