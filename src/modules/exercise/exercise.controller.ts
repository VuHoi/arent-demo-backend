import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Get, Post, Query, Res, Body, Auth } from '@/utils/expressDecorators';
import ExerciseService from '@/modules/exercise/exercise.service';
import { Response } from 'express';
import * as exerciseValidation from './exercise.validation';

import { Exercise, ExerciseQuery } from './exercise.type';
import { CONTROLLERS } from '@/config/constants';
import { authenticated } from '@/api/middlewares/authenticated';
import { AuthType } from '@/types/Common';

@Service()
@Controller(`/public/${CONTROLLERS.EXERCISE}`)
export class ExerciseController {
  @Inject()
  private exerciseService: ExerciseService;

  // Get exercise list
  @Get('/', [authenticated, exerciseValidation.queryPublic])
  async privateQuery(@Res() res: Response, @Query() query: ExerciseQuery, @Auth() auth: AuthType) {
    const result = await this.exerciseService.query(query, auth);
    res.status(httpStatusCode.OK).json(result);
  }

  @Post('/', [authenticated, exerciseValidation.create])
  async createNewexerciseItem(@Res() res: Response, @Body() body: Exercise, @Auth() auth: AuthType) {
    const result = await this.exerciseService.createNewExercise(body, auth);
    res.status(httpStatusCode.OK).json(result);
  }
}
