import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Get, Query, Res } from '@/utils/expressDecorators';
import MenuService from '@/modules/menu/menu.service';
import { Response } from 'express';
import * as contentValidation from './menu.validation';
import { buildQueryFilter } from '@/utils/common';
import { MenuQuery } from './menu.type';
import { CONTROLLERS } from '@/config/constants';

@Service()
@Controller(`/private/${CONTROLLERS.MENU}`)
export class PrivateContentController {
  @Inject()
  private menuService: MenuService;

  // Get menu list
  @Get('/', [contentValidation.privateQuery])
  async privateQuery(@Res() res: Response, @Query() query: MenuQuery) {
    const opts = buildQueryFilter(query);
    const result = await this.menuService.query(opts.filter, opts.query);
    res.status(httpStatusCode.OK).json({ data: result });
  }
}

@Service()
@Controller(`/public/${CONTROLLERS.MENU}`)
export class ContentController {
  @Inject()
  private menuService: MenuService;

  // Get menu list
  @Get('/', [contentValidation.privateQuery])
  async privateQuery(@Res() res: Response, @Query() query: MenuQuery) {
    const opts = buildQueryFilter(query);
    const result = await this.menuService.query(opts.filter, opts.query);
    res.status(httpStatusCode.OK).json({ data: result });
  }
}
