import joi from 'joi';

export const getSensorByIdSchema = joi.object({
  id: joi.number().required().min(1).max(5),
});
