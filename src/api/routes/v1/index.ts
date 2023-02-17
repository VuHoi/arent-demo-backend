import { Application, Router } from 'express';
import { attachControllers } from '@/utils/expressDecorators';
import env from '@/config/env';
import { ContentController } from '@/modules/menu/menu.controller';

import StorageController from '@/modules/storage/storage.controller';

const route = Router();

export default (app: Application) => {
  app.use(`${env.API_PREFIX}/v1`, route);

  attachControllers(route, [ContentController, StorageController]);
};
