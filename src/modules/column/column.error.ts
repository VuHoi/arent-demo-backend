import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  COLUMN_NOT_FOUND: {
    message: 'Column  not found',
    code: '3001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
  },
  COLUMN_ALREADY_EXIST: {
    message: 'Column  already exist',
    code: '3002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
  },
});

export class ColumnError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
