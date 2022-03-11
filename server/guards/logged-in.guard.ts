import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Injectable()
export class LoggedInGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
}