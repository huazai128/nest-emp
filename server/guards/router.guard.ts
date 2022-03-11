import { ExecutionContext, Injectable } from "@nestjs/common";
import { LoggedInGuard } from "./logged-in.guard";
import { HttpUnauthorizedError } from "@app/errors/unauthorized.error";

@Injectable()
export class RouterGuard extends LoggedInGuard {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
    handleRequest(error, authInfo, errInfo) {
        if (authInfo && !error && !errInfo) {
            return authInfo
        } else {
            throw error || new HttpUnauthorizedError(errInfo?.message)
        }
    }
}