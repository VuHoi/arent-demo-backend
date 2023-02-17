import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  'common.system': {
    message: 'Internal Server Error',
    code: null,
    status: httpStatusCode.INTERNAL_SERVER_ERROR,
    isPublic: false,
    locales: {
      vi: 'Lỗi hệ thống',
    },
  },
  'common.unknown': {
    message: 'Unknown Error',
    code: null,
    status: httpStatusCode.INTERNAL_SERVER_ERROR,
    isPublic: false,
    locales: {
      vi: 'Lỗi không xác định',
    },
  },
  'common.not_found': {
    message: 'Not found',
    code: null,
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
    locales: {
      vi: 'API không tồn tại',
    },
  },
  'common.access_denied': {
    message: 'Access Denied',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Truy cập bị từ chối',
    },
  },
  'common.validation_failed': {
    message: 'Validation failed',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Lỗi định dạng không hợp lệ',
    },
  },
});

export class SystemError extends AppError {
  constructor(msg?: string) {
    super({
      ...errors['common.system'],
      ...(msg && {
        message: msg,
        locales: {
          vi: msg,
        },
      }),
    });
  }
}

export class UnknownError extends AppError {
  constructor(msg?: string) {
    super({
      ...errors['common.unknown'],
      ...(msg && {
        message: msg,
        locales: {
          vi: msg,
        },
      }),
    });
  }
}

export class CommonError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}