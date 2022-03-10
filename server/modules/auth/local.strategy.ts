import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local';
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(id: string, password: string) {
        console.log(id, password, '=========')
        const res = this.authService.validateUser({ _id: id, account: 'admin' });
        return res
    }
}