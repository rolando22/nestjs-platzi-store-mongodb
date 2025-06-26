import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  // APP
  NODE_ENV: Joi.string().valid('dev', 'stag', 'prod', 'test'),
  PORT: Joi.number().required(),
  // DATABASE MONGO
  MONGO_DB: Joi.string().required(),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_CONNECTION: Joi.string().required(),
  // TYPEORM
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
});
