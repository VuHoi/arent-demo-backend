import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  NO_FILE_UPLOADED: {
    message: 'No file uploaded',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'File tải lên rỗng',
    },
  },
  FORMAT_IS_NOT_SUPPORTED: {
    message: 'The format is not supported',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Định dạng không được hỗ trợ',
    },
  },
});

export class StorageError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
