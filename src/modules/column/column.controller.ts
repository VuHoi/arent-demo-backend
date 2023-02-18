import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Get, Post, Query, Res, Body, Auth, Put, Params } from '@/utils/expressDecorators';
import ColumnService from '@/modules/column/column.service';
import { Response } from 'express';
import * as columnValidation from './column.validation';
import { buildQueryFilter } from '@/utils/common';
import { Column, ColumnParams, ColumnQuery } from './column.type';
import { CONTROLLERS } from '@/config/constants';
import { authenticated } from '@/api/middlewares/authenticated';
import { AuthType } from '@/types/Common';

@Service()
@Controller(`/private/${CONTROLLERS.COLUMN}`)
export class PrivateColumnController {
  @Inject()
  private columnService: ColumnService;

  // Get column list  by admin
  @Get('/', [authenticated, columnValidation.privateQuery])
  async privateQuery(@Res() res: Response, @Query() query: ColumnQuery) {
    const opts = buildQueryFilter(query);

    const result = await this.columnService.queryByAdmin(
      { ...opts.filter, ...(opts.filter.tags && { tags: opts.filter.tags.split(',') }) },
      opts.query,
    );
    res.status(httpStatusCode.OK).json({ data: result });
  }

  @Post('/', [authenticated, columnValidation.create])
  async createNewcolumnItem(@Res() res: Response, @Body() body: Column, @Auth() auth: AuthType) {
    const result = await this.columnService.createNewColumn(body, auth);
    res.status(httpStatusCode.OK).json(result);
  }

  @Put('/:id', [authenticated, columnValidation.update])
  async updatecolumnItem(
    @Res() res: Response,
    @Body() body: Column,
    @Auth() auth: AuthType,
    @Params() params: ColumnParams,
  ) {
    const result = await this.columnService.updateColumn(params.id, body, auth);
    res.status(httpStatusCode.OK).json(result);
  }
}

@Service()
@Controller(`/public/${CONTROLLERS.COLUMN}`)
export class ColumnController {
  @Inject()
  private columnService: ColumnService;

  // Get column list
  @Get('/', [columnValidation.queryPublic])
  async privateQuery(@Res() res: Response, @Query() query: ColumnQuery) {
    const result = await this.columnService.query(query);
    res.status(httpStatusCode.OK).json(result);
  }
}
