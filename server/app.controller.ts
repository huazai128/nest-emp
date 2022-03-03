import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(@Req() req: Request, @Res() res: Response) {
        // webpack 已经解析ejs语法导致， 数据无法被传递页面
        return { data: 1212 }
    }
}
