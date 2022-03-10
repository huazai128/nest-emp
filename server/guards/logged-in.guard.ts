import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express'

@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const isLogin = context.switchToHttp().getRequest<Request>().isAuthenticated();
        console.log(isLogin, 'isLogin')
        return isLogin
    }
}