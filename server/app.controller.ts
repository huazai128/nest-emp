import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(@Res() res: Response) {
        return res.render(join(__dirname, "../client/index.html"), { data: 11 }) // webpack 已经解析ejs语法导致
    }
}
