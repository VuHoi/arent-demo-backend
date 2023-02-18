import { STATUS } from '@/config/constants';
import validate, { Joi, Segments } from '@/core/validation';
import { ORDER } from '@/types/Common';

export const privateQuery = validate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().default(1),
    per_page: Joi.number().default(10),
    sort_by: Joi.string().default('created_at'),
    sort_order: Joi.string().valid(ORDER).default(ORDER.ASC),
    status: Joi.string().valid(STATUS),
    q: Joi.string().allow(''),
  }),
});

export const create = validate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    level: Joi.number(),
    order: Joi.number(),
    icon: Joi.string(),
  }),
});
