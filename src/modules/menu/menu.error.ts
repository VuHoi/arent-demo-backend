import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  MENU_ITEM_NOT_FOUND: {
    message: 'Menu item not found',
    code: '1001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
  },
  MENU_ITEM_ALREADY_EXIST: {
    message: 'Menu item already exist',
    code: '1002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
  },
});

export class MenuError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
