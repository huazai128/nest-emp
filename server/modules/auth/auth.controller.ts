import { HttpRequest } from "@app/interfaces/request.interface";
import { TransformPipe } from "@app/pipes/transform.pipe";
import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from 'express'

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    public async adminLogin(@Req() req: Request, @Body(new TransformPipe()) data: HttpRequest, @Res() res: Response) {
        const { access_token, ...result } = await this.authService.login(data)
        res.cookie('jwt', access_token);
        console.log(result, 'result=======');
        (req.session as any).user = 1212
        return res.status(200).jsonp(result)
    }

    @Get('user')
    public async getUserInfo(@Param('id') id: string) {
        return await this.authService.findById({ id })
    }
}