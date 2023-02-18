import { Inject, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Get, Post, Query, Res, Body, Auth, Put, Params } from '@/utils/expressDecorators';
import MenuService from '@/modules/menu/menu.service';
import { Response } from 'express';
import * as menuValidation from './menu.validation';
import { buildQueryFilter } from '@/utils/common';
import { MenuItem, MenuParams, MenuQuery } from './menu.type';
import { CONTROLLERS } from '@/config/constants';
import { authenticated } from '@/api/middlewares/authenticated';
import { AuthType } from '@/types/Common';

@Service()
@Controller(`/private/${CONTROLLERS.MENU}`)
export class PrivateMenuController {
  @Inject()
  private menuService: MenuService;

  // Get menu list  by admin
  @Get('/', [authenticated, menuValidation.privateQuery])
  async privateQuery(@Res() res: Response, @Query() query: MenuQuery) {
    const opts = buildQueryFilter(query);
    const result = await this.menuService.queryByAdmin(opts.filter, opts.query);
    res.status(httpStatusCode.OK).json({ data: result });
  }

  @Post('/', [authenticated, menuValidation.create])
  async createNewMenuItem(@Res() res: Response, @Body() body: MenuItem, @Auth() auth: AuthType) {
    const result = await this.menuService.createNewMenuItem(body, auth);
    res.status(httpStatusCode.OK).json(result);
  }

  @Put('/:id', [authenticated, menuValidation.create])
  async updateMenuItem(
    @Res() res: Response,
    @Body() body: MenuItem,
    @Auth() auth: AuthType,
    @Params() params: MenuParams,
  ) {
    const result = await this.menuService.updateMenuItem(params.id, body, auth);
    res.status(httpStatusCode.OK).json(result);
  }
}

@Service()
@Controller(`/public/${CONTROLLERS.MENU}`)
export class MenuController {
  @Inject()
  private menuService: MenuService;

  // Get menu list
  @Get('/', [])
  async privateQuery(@Res() res: Response) {
    const result = await this.menuService.query();
    res.status(httpStatusCode.OK).json(result);
  }
}
