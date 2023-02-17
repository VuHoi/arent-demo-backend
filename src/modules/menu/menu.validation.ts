import { STATUS } from '@/config/constants';
import validate, { Joi, Segments } from '@/core/validation';
import { ORDER } from '@/types/Common';

export const privateQuery = validate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().default(1),
    perPage: Joi.number().default(10),
    sortBy: Joi.string().default('created_at'),
    sortOrder: Joi.string().valid(ORDER).default(ORDER.ASC),
    status: Joi.string().valid(STATUS),
    q: Joi.string().allow(''),
  }),
});
