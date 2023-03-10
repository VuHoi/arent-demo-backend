import httpStatusCode from 'http-status';

export type AppErrorLocale = 'vi' | 'en';

export type AppErrorJSON = {
  message: string;
  code: string | null;
  status: number;
  details?: Array<{ path: string; message: string }>;
  isPublic?: boolean;
};

/**
 * App Error
 * @extends Error
 */
export class AppError extends Error {
  readonly code: AppErrorJSON['code'];
  readonly status: AppErrorJSON['status'];
  readonly details: AppErrorJSON['details'];
  readonly isPublic: AppErrorJSON['isPublic'];

  constructor(err: AppErrorJSON) {
    super(err.message);
    this.name = this.constructor.name;
    this.message = err.message;
    this.code = err.code || null;
    this.status = err.status || httpStatusCode.INTERNAL_SERVER_ERROR;
    this.details = err.details || [];
    this.isPublic = err.isPublic || false;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export default AppError;
