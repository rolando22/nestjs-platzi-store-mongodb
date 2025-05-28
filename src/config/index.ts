import { registerAs } from '@nestjs/config';

const configObj = {
  environment: process.env.NODE_ENV || 'dev',
  port: Number(process.env.PORT) || 3000,
};

export default registerAs('config', () => configObj);
