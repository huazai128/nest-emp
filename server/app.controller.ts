import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RouterGuard } from './guards/router.guard';
import { Request, Response } from 'express'

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
    login() {
        return { data: 121212 }
    }

    /**
     * 错误页面
     * @return {*} 
     * @memberof AppController
     */
    @Get('error')
    @Render('error')
    getError(@Res() res: Response) {
        res.redirect('/login')
        res.end();
        return
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
