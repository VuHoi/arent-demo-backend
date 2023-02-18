import validate, { Joi, Segments } from '@/core/validation';

export const create = validate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  }),
});

export const queryPublic = validate({
  [Segments.QUERY]: Joi.object({
    start_date: Joi.date(),
    end_date: Joi.date(),
  }),
});
