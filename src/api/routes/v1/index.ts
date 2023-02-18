import { Application, Router } from 'express';
import { attachControllers } from '@/utils/expressDecorators';
import env from '@/config/env';
import { MenuController, PrivateMenuController } from '@/modules/menu/menu.controller';

import StorageController from '@/modules/storage/storage.controller';
import { RecordController } from '@/modules/record/record.controller';
import { ColumnController, PrivateColumnController } from '@/modules/column/column.controller';
import { DiaryController } from '../../../modules/diary/diary.controller';
import { ExerciseController } from '../../../modules/exercise/exercise.controller';

const route = Router();

export default (app: Application) => {
  app.use(`${env.API_PREFIX}/v1`, route);

  attachControllers(route, [
    MenuController,
    PrivateMenuController,
    PrivateColumnController,
    ColumnController,
    RecordController,
    StorageController,
    DiaryController,
    ExerciseController,
  ]);
};
