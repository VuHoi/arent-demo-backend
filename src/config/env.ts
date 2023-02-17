import { getRuntimeEnv } from '../utils/common';
import { LogLevel } from '@/core/logger';

type AppEnv = 'local' | 'development' | 'production';

/**
 * ENV config
 */
const env = {
  APP_ENV: getRuntimeEnv('APP_ENV') as AppEnv,
  APP_NAME: getRuntimeEnv('APP_NAME'),
  APP_VERSION: getRuntimeEnv('APP_VERSION'),
  APP_PORT: parseInt(getRuntimeEnv('APP_PORT'), 10),
  APP_HOST: getRuntimeEnv('APP_HOST'),
  API_PREFIX: getRuntimeEnv('API_PREFIX'),
  MONGO_URI: getRuntimeEnv('MONGO_URI'),

  AWS_ACCESS_KEY_ID: getRuntimeEnv('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: getRuntimeEnv('AWS_SECRET_ACCESS_KEY'),
  AWS_REGION: getRuntimeEnv('AWS_REGION'),
  AWS_S3_BUCKET: getRuntimeEnv('AWS_S3_BUCKET'),

  LOG_LEVEL: getRuntimeEnv('LOG_LEVEL') as LogLevel,
};

export default env;
