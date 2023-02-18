import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Get, Post, Query, Res, Body, Auth } from '@/utils/expressDecorators';
import DiaryService from '@/modules/diary/diary.service';
import { Response } from 'express';
import * as diaryValidation from './diary.validation';

import { Diary, DiaryQuery } from './diary.type';
import { CONTROLLERS } from '@/config/constants';
import { authenticated } from '@/api/middlewares/authenticated';
import { AuthType } from '@/types/Common';

@Service()
@Controller(`/public/${CONTROLLERS.DIARY}`)
export class DiaryController {
  @Inject()
  private diaryService: DiaryService;

  // Get diary list
  @Get('/', [authenticated, diaryValidation.queryPublic])
  async privateQuery(@Res() res: Response, @Query() query: DiaryQuery, @Auth() auth: AuthType) {
    const result = await this.diaryService.query(query, auth);
    res.status(httpStatusCode.OK).json(result);
  }

  @Post('/', [authenticated, diaryValidation.create])
  async createNewdiaryItem(@Res() res: Response, @Body() body: Diary, @Auth() auth: AuthType) {
    const result = await this.diaryService.createNewDiary(body, auth);
    res.status(httpStatusCode.OK).json(result);
  }
}
