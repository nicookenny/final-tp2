import Joi from 'joi';

export const addMeasureSchema = Joi.object({
  id: Joi.number().required().min(1).max(5),
  temperature: Joi.number().required().min(-20).max(100),
});
