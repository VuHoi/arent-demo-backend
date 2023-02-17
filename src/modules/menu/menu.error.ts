import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  CONTENT_NOT_FOUND: {
    message: 'Content not found',
    code: '1001',
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
    locales: {
      vi: 'Nội dung không tồn tại',
      en: 'Content not found',
    },
  },
  CONTENT_ALREADY_EXIST: {
    message: 'Content already exist',
    code: '1002',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
    locales: {
      vi: 'Nội dung đã tồn tại',
      en: 'Content already exist',
    },
  },
  CONTENT_DONE_OR_PROCESSING: {
    message: 'Content has been made or is being worked on by someone else',
    code: '1003',
    status: httpStatusCode.CONFLICT,
    isPublic: true,
    locales: {
      vi: 'Nội dung đã được thực hiện hoặc đang được người khác làm',
      en: 'Content has been made or is being worked on by someone else',
    },
  },
});

export class ContentError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
