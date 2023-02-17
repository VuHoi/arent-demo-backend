import { Container } from 'typedi';

import { DILogger } from '@/loaders/loggerLoader';
import mongoose, { ConnectOptions } from 'mongoose';
import env from '@/config/env';

const postgresDBLoader = async () => {
  const logger = Container.get(DILogger);

  const options: ConnectOptions = {
    autoIndex: true,
    autoCreate: false,
    dbName: 'test',
  };
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(env.MONGO_URI, options);
  } catch {
    logger.error('Failed to connect mongodb');
  }
};

export default postgresDBLoader;
