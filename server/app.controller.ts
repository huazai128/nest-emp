import { Controller, Get, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';

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
    getApi() {
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
     * 错误页面
     * @return {*} 
     * @memberof AppController
     */
    @Get('error')
    @Render('error')
    getError() {
        return { data: 12 }
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
