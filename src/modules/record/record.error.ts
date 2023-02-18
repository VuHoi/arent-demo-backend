import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  RECORD_NOT_FOUND: {
    message: 'Record not found',
    code: '2001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
  },
  RECORD_ALREADY_EXIST: {
    message: 'Record already exist',
    code: '002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
  },
});

export class RecordError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
