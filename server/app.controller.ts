import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(@Req() req: Request) {
        return { data: 121122 }
    }
    @Get('test')
    getTest(@Req() req: Request, @Res() res: Response) { // 注入了res, 就必须res结束，不然会卡住
        return res.render(join(__dirname, "../client/index.html"), { data: 11 })
    }
}
