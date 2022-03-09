import { HttpRequest } from "@app/interfaces/request.interface";
import { TransformPipe } from "@app/pipes/transform.pipe";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('/api/')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    public async adminLogin(@Body(new TransformPipe()) data: HttpRequest) {
        const res = await this.authService.login(data)
        return { name: 12 };
    }
}