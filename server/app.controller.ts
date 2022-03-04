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
    @Get('api')
    getApi(@Req() req: Request) {
        return { data: 121122 }
    }

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
     * 渲染页面
     * @param {Request} req
     * @return {*} 
     * @memberof AppController
     */
    @Get()
    @Render('index')
    getTest() {
        return { data: 12 }
    }

}
