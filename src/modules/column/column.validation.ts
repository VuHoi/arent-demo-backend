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
    image: Joi.string(),
    is_recommened: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
  }),
});

export const update = validate({
  [Segments.BODY]: Joi.object({
    title: Joi.string(),
    image: Joi.string(),
    is_recommened: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
  }),
});

export const queryPublic = validate({
  [Segments.QUERY]: Joi.object({
    is_recommened: Joi.boolean(),
    type: Joi.string(),
  }),
});
