import { CommonError } from '@/core/errors/CommonError';
import { RequestHandler } from 'express';

// :TODO handle authenticate
export const authenticated = function (req: any, res: any, next: any): Promise<RequestHandler> {
  try {
    if (req.headers.authenticated !== 'true') {
      throw new CommonError('common.access_denied');
    }
    req.auth = {
      username: 'account1',
      email: 'account1@gmail.com',
      id: '63efb490068912244d0f7235',
    };
    return next();
  } catch (err) {
    return next(err);
  }
};
