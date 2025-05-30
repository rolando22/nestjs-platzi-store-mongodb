import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  // APP
  NODE_ENV: Joi.string().valid('dev', 'stag', 'prod', 'test'),
  PORT: Joi.number().required(),
  // DATABASE POSTGRES
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  // PGADMIN
  PGADMIN_DEFAULT_EMAIL: Joi.string().email().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
  PGADMIN_DEFAULT_PORT: Joi.number().required(),
});
