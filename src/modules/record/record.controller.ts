import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Auth, Controller, Get, Query, Res } from '@/utils/expressDecorators';
import RecordService from '@/modules/record/record.service';
import { Response } from 'express';
import { CONTROLLERS } from '@/config/constants';
import * as validation from './record.validation';
import { authenticated } from '@/api/middlewares/authenticated';
import { RecordQuery } from './record.type';
import { AuthType } from '@/types/Common';

@Service()
@Controller(`/public/${CONTROLLERS.RECORD}`)
export class RecordController {
  @Inject()
  private recordService: RecordService;

  // Get record list for graph
  @Get('/', [authenticated, validation.query])
  async privateQuery(@Res() res: Response, @Query() query: RecordQuery, @Auth() auth: AuthType) {
    const result = await this.recordService.query(query, auth);
    res.status(httpStatusCode.OK).json(result);
  }
}
