import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    /**
     * 请求接口； 注入res，就必须使用res,返回
     * @param {Request} req
     * @return {*} 
     * @memberof AppController
     */
    @Get()
    getApi(@Req() req: Request) {
        return { data: 121122 }
    }

    /**
     * 渲染页面
     * @param {Request} req
     * @return {*} 
     * @memberof AppController
     */
    @Get('test')
    @Render('index')
    getTest(@Req() req: Request) {
        // return res.render(join('../client.html'), { data: 1212 })
        return { data: 121212 }
    }
}
