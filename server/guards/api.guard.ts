import { ExecutionContext, Injectable } from "@nestjs/common";
import { LoggedInGuard } from "./logged-in.guard";
import { Request } from 'express'
import { HttpUnauthorizedError } from "@app/errors/unauthorized.error";

@Injectable()
export class ApiGuard extends LoggedInGuard {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
    handleRequest(error, authInfo, errInfo) {
        const validToken = Boolean(authInfo)
        const emptyToken = !authInfo && errInfo?.message === 'No auth token'
        if (!error && (validToken || emptyToken)) {
            return authInfo
        } else {
            throw error || new HttpUnauthorizedError()
        }
    }
}