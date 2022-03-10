import { ExecutionContext, Injectable } from "@nestjs/common";
import { LoggedInGuard } from "./logged-in.guard";
import { Request } from 'express'

@Injectable()
export class UserGuard extends LoggedInGuard {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const session = req.session
        console.log(session, 'session=======')
        return super.canActivate(context)
    }
}