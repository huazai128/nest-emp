import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RouterGuard } from './guards/router.guard';
import { Request, Response } from 'express'
import { QueryParams } from './decorators/params.decorator';
import { IRequest } from './interfaces/request.interface';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    /**
   * 渲染页面
   * @param {Request} req
   * @return {*} 
   * @memberof AppController
   */
    @Get('login')
    @Render('index')
    login(@Req() req: IRequest) {
        if (req.isLogin) {
            // 重定向
            return { redirectUrl: '/' }
        } else {
            return { data: 121212 }
        }

    }

    /**
     * 错误页面
     * @return {*} 
     * @memberof AppController
     */
    @Get('error')
    @Render('error')
    getError() {
        return { msg: '1212' }
    }

    /**
     * 渲染页面
     * @param {Request} req
     * @return {*} 
     * @memberof AppController
     */
    @UseGuards(RouterGuard)
    @Get()
    @Render('index')
    getTest(@Req() req: Request) {
        return { data: 12 }
    }

}
