import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'stag', 'prod', 'test'),
  PORT: Joi.number().required(),
});
