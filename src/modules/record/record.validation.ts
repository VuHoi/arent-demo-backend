import validate, { Joi, Segments } from '@/core/validation';

export const query = validate({
  [Segments.QUERY]: Joi.object({
    start_date: Joi.date().required(), // ISO Date
    end_date: Joi.date().required(), // ISO Date
  }),
});
