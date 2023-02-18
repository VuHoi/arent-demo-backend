import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  DIARY_NOT_FOUND: {
    message: 'Diary not found',
    code: '4001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
  },
  DIARY_ALREADY_EXIST: {
    message: 'Diary already exist',
    code: '4002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
  },
});

export class DiaryError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
