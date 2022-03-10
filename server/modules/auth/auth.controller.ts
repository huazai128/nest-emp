import { LocalGuard } from "@app/guards/local.guard";
import { HttpRequest } from "@app/interfaces/request.interface";
import { TransformPipe } from "@app/pipes/transform.pipe";
import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalGuard)
    @Post('api/login')
    public async adminLogin(@Req() req: Request) {
        console.log('============')
        // const result = await this.authService.login(data)
        return req.session
    }

    @Get('user')
    public async(@Param('id') id: string) {
        console.log(id)
        return this.authService.findById({ id })
    }
}